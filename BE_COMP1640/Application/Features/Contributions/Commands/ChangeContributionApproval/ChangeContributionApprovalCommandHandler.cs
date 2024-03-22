using Application.Common.Interfaces;
using Application.Common.Models;
using AutoMapper;
using Domain.Enums;
using ErrorOr;
using Hangfire;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Contributions.Commands.ChangeContributionApproval
{
    public class ChangeContributionApprovalCommandHandler : IRequestHandler<ChangeContributionApprovalCommand, ErrorOr<SuccessResult>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly ICurrentUserProvider _currentUserProvider;

        public ChangeContributionApprovalCommandHandler(IApplicationDbContext context,
            IMapper mapper,
            IEmailService emailService,
            ICurrentUserProvider currentUserProvider)
        {
            _context = context;
            _mapper = mapper;
            _emailService = emailService;
            _currentUserProvider = currentUserProvider;
        }

        public async Task<ErrorOr<SuccessResult>> Handle(ChangeContributionApprovalCommand request, CancellationToken cancellationToken)
        {
            var contribution = await _context.Contributions
                .Include(c => c.CreatedBy)
                .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);
            if (contribution == null) return Error.NotFound(description: "Contribution not found");

            var status = request.Approved ? ContributionStatus.Approved : ContributionStatus.Rejected;
            contribution.Status = status;

            await _context.SaveChangesAsync(cancellationToken);

            var contributor = contribution.CreatedBy;
            var coordinator = _currentUserProvider.GetCurrentUser();


            //Sending email notification to the Contributor
            string statusColor = request.Approved ? "green" : "red";
            string statusText = $"<span style=\"color: {statusColor};\"><strong>{status}</strong></span>";

            BackgroundJob.Enqueue(() => _emailService.SendEmailAsync(contribution.CreatedBy.Email,
                $"Your contribution has been {status}",
                $"Hi {contributor.FirstName} {contributor.LastName}" +
                $"<p>Your contribution with the title: <strong>{contribution.Title}</strong> has been {statusText} by the your faculty Coordinator with the email: <strong>{coordinator.Email}</strong>"));

            //Return the result to the client
            return new SuccessResult(
                title: $"Contribution has been {(request.Approved ? "Approved" : "Rejected")} successfully!");

        }
    }
}

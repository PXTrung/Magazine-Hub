using Application.Common.Interfaces;
using Application.Common.Models;
using AutoMapper;
using Domain.Entities;
using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Feedbacks.Commands.CreateFeedback
{
    public class CreateFeedbackCommandHandler : IRequestHandler<CreateFeedbackCommand, ErrorOr<SuccessResult>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CreateFeedbackCommandHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ErrorOr<SuccessResult>> Handle(CreateFeedbackCommand request, CancellationToken cancellationToken)
        {
            var contribution = await _context.Contributions.AnyAsync(c => c.Id == request.ContributionId, cancellationToken);
            if (contribution == false) return Error.NotFound(description: "Contribution not found");

            var feedbackEntity = _mapper.Map<Feedback>(request);

            await _context.Feedbacks.AddAsync(feedbackEntity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return new SuccessResult(title: "Created a feedback successfully");

        }
    }
}

using Application.Common.Interfaces;
using Application.Common.Models;
using AutoMapper;
using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Contributions.Commands.UpdateContribution
{
    public class UpdateContributionCommandHandler : IRequestHandler<UpdateContributionCommand, ErrorOr<SuccessResult>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileManager _fileManager;
        private readonly ICurrentUserProvider _currentUserProvider;

        public UpdateContributionCommandHandler(IApplicationDbContext context,
            IMapper mapper,
            IFileManager fileManager,
            ICurrentUserProvider currentUserProvider)
        {
            _context = context;
            _mapper = mapper;
            _fileManager = fileManager;
            _currentUserProvider = currentUserProvider;
        }

        public async Task<ErrorOr<SuccessResult>> Handle(UpdateContributionCommand request, CancellationToken cancellationToken)
        {

            var contributionEntity = await _context.Contributions
                .Include(c => c.Image)
                .Include(c => c.Document)
                .FirstOrDefaultAsync(c => c.Id == request.Id && c.CreatedById == _currentUserProvider.GetCurrentUser().Id, cancellationToken);

            _mapper.Map(request, contributionEntity);

            if (contributionEntity == null) return Error.NotFound("Contribution not found");


            if (request.ImageFile != null) await _fileManager.UpdateFileAsync(request.ImageFile, "Images", contributionEntity.Image);

            if (request.DocumentFile != null) await _fileManager.UpdateFileAsync(request.DocumentFile, "Documents", contributionEntity.Document);

            await _context.SaveChangesAsync(cancellationToken);

            return new SuccessResult(title: "Updated contribution successfully!");
        }
    }
}

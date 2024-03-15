using Application.Common.Interfaces;
using AutoMapper;
using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Contributions.Commands.UpdateContribution
{
    public class UpdateContributionCommandHandler : IRequestHandler<UpdateContributionCommand, ErrorOr<Success>>
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

        public async Task<ErrorOr<Success>> Handle(UpdateContributionCommand request, CancellationToken cancellationToken)
        {
            var currentUser = _currentUserProvider.GetCurrentUser();

            var contributionEntity = await _context.Contributions
                .Include(c => c.Image)
                .Include(c => c.Document)
                .FirstOrDefaultAsync(c => c.Id == request.Id && c.CreatedById == currentUser.Id, cancellationToken);

            if (contributionEntity == null) return Error.NotFound(description: "Contribution not found");


            _mapper.Map(request, contributionEntity);

            if (request.ImageFile != null) await _fileManager.UpdateFileAsync(request.ImageFile, "Images", contributionEntity.Image);

            if (request.DocumentFile != null) await _fileManager.UpdateFileAsync(request.DocumentFile, "Documents", contributionEntity.Document);

            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success;
        }
    }
}

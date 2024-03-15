using Application.Common.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using ErrorOr;
using MediatR;

namespace Application.Features.Contributions.Commands.CreateContribution
{
    public class CreateContributionCommandHandler : IRequestHandler<CreateContributionCommand, ErrorOr<Success>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileManager _fileManager;


        public CreateContributionCommandHandler(IApplicationDbContext context,
            IMapper mapper,
            IFileManager fileManager)
        {
            _context = context;
            _mapper = mapper;
            _fileManager = fileManager;
        }

        public async Task<ErrorOr<Success>> Handle(CreateContributionCommand request, CancellationToken cancellationToken)
        {
            //Mapping and make status as Submitted
            var contributionEntity = _mapper.Map<Contribution>(request);
            contributionEntity.Status = ContributionStatus.Submitted;

            //Save Image file and create Media entity
            var imageEntity = await _fileManager.SaveFileAsync(request.ImageFile, "Images");
            //Save Document file and create Media entity
            var documentEntity = await _fileManager.SaveFileAsync(request.DocumentFile, "Documents");

            //Add Media entites
            await _context.Media.AddRangeAsync([imageEntity, documentEntity], cancellationToken);

            //Connect FK
            contributionEntity.DocumentId = documentEntity.Id;
            contributionEntity.ImageId = imageEntity.Id;


            await _context.Contributions.AddAsync(contributionEntity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return new ErrorOr<Success>();
        }
    }
}

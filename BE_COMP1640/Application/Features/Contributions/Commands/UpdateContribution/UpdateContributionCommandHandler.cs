//using Application.Common.Interfaces;
//using AutoMapper;
//using ErrorOr;
//using MediatR;
//using Microsoft.EntityFrameworkCore;

//namespace Application.Features.Contributions.Commands.UpdateContribution
//{
//    public class UpdateContributionCommandHandler : IRequestHandler<UpdateContributionCommand, ErrorOr<Success>>
//    {
//        private readonly IApplicationDbContext _context;
//        private readonly IMapper _mapper;
//        private readonly IFileManager _fileManager;

//        public UpdateContributionCommandHandler(IApplicationDbContext context,
//            IMapper mapper,
//            IFileManager fileManager)
//        {
//            _context = context;
//            _mapper = mapper;
//            _fileManager = fileManager;
//        }

//        public async Task<ErrorOr<Success>> Handle(UpdateContributionCommand request, CancellationToken cancellationToken)
//        {
//            var contributionEntity = await _context.Contributions.FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);
//            if (contributionEntity == null) return Error.NotFound(description: "Contribution not found");

//            _mapper.Map(request, contributionEntity);

//        }
//    }
//}

using Application.Common.Interfaces;
using AutoMapper;
using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Contributions.Queries.ListContribution
{
    public class ListContributionQueryHandler : IRequestHandler<ListContributionQuery, ErrorOr<IQueryable<ListContributionDto>>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ListContributionQueryHandler(IApplicationDbContext context,
             IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<ErrorOr<IQueryable<ListContributionDto>>> Handle(ListContributionQuery request, CancellationToken cancellationToken)
        {
            var contributions = _context.Contributions
                .Include(c => c.CreatedBy)
                .Include(c => c.Image)
                .Include(c => c.Document)
                .AsNoTracking();

            var result = _mapper.ProjectTo<ListContributionDto>(contributions);

            return Task.FromResult(result.ToErrorOr());
        }
    }
}

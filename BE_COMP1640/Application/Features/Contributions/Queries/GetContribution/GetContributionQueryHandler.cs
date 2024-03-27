
using Application.Common.Interfaces;
using AutoMapper;
using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Contributions.Queries.GetContribution;

public class GetContributionQueryHandler : IRequestHandler<GetContributionQuery, ErrorOr<GetContributionDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetContributionQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }


    public async Task<ErrorOr<GetContributionDto>> Handle(GetContributionQuery request, CancellationToken cancellationToken)
    {
        //Find contribution by Id
        var contributionEntity = await _context.Contributions
            .Include(c => c.Document)
            .Include(c => c.Image)
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);
        //Check if null
        if (contributionEntity == null) return Error.NotFound(description: "Contribution not found");

        return _mapper.Map<GetContributionDto>(contributionEntity);
    }
}
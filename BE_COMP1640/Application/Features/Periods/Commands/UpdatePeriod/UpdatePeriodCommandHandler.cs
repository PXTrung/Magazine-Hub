using Application.Common.Interfaces;
using AutoMapper;
using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Periods.Commands.UpdatePeriod
{
    public class UpdatePeriodCommandHandler : IRequestHandler<UpdatePeriodCommand, ErrorOr<Success>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UpdatePeriodCommandHandler(IApplicationDbContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public async Task<ErrorOr<Success>> Handle(UpdatePeriodCommand request, CancellationToken cancellationToken)
        {
            var periodEntity = await _context.Periods.FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

            _mapper.Map(request, periodEntity);

            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success;
        }
    }
}

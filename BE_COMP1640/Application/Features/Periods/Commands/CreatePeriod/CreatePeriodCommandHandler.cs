using Application.Common.Interfaces;
using AutoMapper;
using Domain.Entities;
using ErrorOr;
using MediatR;

namespace Application.Features.Periods.Commands.CreatePeriod
{
    public class CreatePeriodCommandHandler : IRequestHandler<CreatePeriodCommand, ErrorOr<Success>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CreatePeriodCommandHandler(IApplicationDbContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ErrorOr<Success>> Handle(CreatePeriodCommand request, CancellationToken cancellationToken)
        {
            var periodEntity = _mapper.Map<Period>(request);

            await _context.Periods.AddAsync(periodEntity, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success;
        }
    }
}

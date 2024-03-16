using Application.Common.Interfaces;
using AutoMapper;
using Domain.Entities;
using ErrorOr;
using MediatR;

namespace Application.Features.Faculties.Commands.CreateFaculty
{
    public class CreateFacultyCommandHandler : IRequestHandler<CreateFacultyCommand, ErrorOr<Success>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CreateFacultyCommandHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ErrorOr<Success>> Handle(CreateFacultyCommand request, CancellationToken cancellationToken)
        {
            var facultyEntity = _mapper.Map<Faculty>(request);
            await _context.Faculties.AddAsync(facultyEntity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success;
        }
    }
}

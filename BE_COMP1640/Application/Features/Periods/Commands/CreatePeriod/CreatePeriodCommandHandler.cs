﻿using Application.Common.Interfaces;
using Application.Common.Models;
using AutoMapper;
using Domain.Entities;
using ErrorOr;
using MediatR;

namespace Application.Features.Periods.Commands.CreatePeriod;

public class CreatePeriodCommandHandler : IRequestHandler<CreatePeriodCommand, ErrorOr<SuccessResult>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CreatePeriodCommandHandler(IApplicationDbContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ErrorOr<SuccessResult>> Handle(CreatePeriodCommand request, CancellationToken cancellationToken)
    {
        var periodEntity = _mapper.Map<Period>(request);

        await _context.Periods.AddAsync(periodEntity, cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);

        return new SuccessResult("Created a new period successfully!");
    }
}
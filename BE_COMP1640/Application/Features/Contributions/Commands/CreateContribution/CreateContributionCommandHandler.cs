using Application.Common.Interfaces;
using Application.Common.Models;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using ErrorOr;
using Hangfire;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Contributions.Commands.CreateContribution;

public class CreateContributionCommandHandler : IRequestHandler<CreateContributionCommand, ErrorOr<SuccessResult>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IFileManager _fileManager;
    private readonly IEmailService _emailService;
    private readonly ICurrentUserProvider _currentUserProvider;


    public CreateContributionCommandHandler(IApplicationDbContext context,
        IMapper mapper,
        IFileManager fileManager,
        IEmailService emailService,
        ICurrentUserProvider currentUserProvider)
    {
        _context = context;
        _mapper = mapper;
        _fileManager = fileManager;
        _emailService = emailService;
        _currentUserProvider = currentUserProvider;
    }

    public async Task<ErrorOr<SuccessResult>> Handle(CreateContributionCommand request, CancellationToken cancellationToken)
    {
        //Mapping and make status as Submitted
        var contributionEntity = _mapper.Map<Contribution>(request);
        contributionEntity.Status = ContributionStatus.Submitted;

        //Save Image file and create Media entity
        var imageEntity = await _fileManager.SaveFileAsync(request.ImageFile, "Images");
        //Save Document file and create Media entity
        var documentEntity = await _fileManager.SaveFileAsync(request.DocumentFile, "Documents");

        //Add Media entities
        await _context.Media.AddRangeAsync([imageEntity, documentEntity], cancellationToken);

        //Connect FK
        contributionEntity.DocumentId = documentEntity.Id;
        contributionEntity.ImageId = imageEntity.Id;


        await _context.Contributions.AddAsync(contributionEntity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        var currentUser = _currentUserProvider.GetCurrentUser();

        //Sending email to all the coordinator of the faculty that the contributor belongs to
        var coordinatorsToSendEmail = await _context.Users
            .Include(u => u.Roles)
            .Where(u => u.FacultyId == currentUser.FacultyId && u.Roles.Any(r => r.NormalizedName == "COORDINATOR"))
            .ToListAsync(cancellationToken);

        foreach (var coordinator in coordinatorsToSendEmail)
        {
            BackgroundJob.Enqueue(() => _emailService.SendEmailAsync(coordinator.Email,
                "New contribution submitted",
                $"Hi {coordinator.FirstName} {coordinator.LastName}" +
                $"<p>A new contribution belong to your faculty has been submitted by <strong>{currentUser.Email}</strong> with the title: <strong>{contributionEntity.Title}</strong>. Please review and handle the contribution</p>"));
        }

        return new SuccessResult(title: "Submitted contribution successfully!");
    }
}
using Application.Common.Interfaces;
using AutoMapper;
using Domain.Entities;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Web;


namespace Application.Features.Auth.Commands.Register;



public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ErrorOr<RegisterDto>>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;
    private readonly ILinkGenerator _linkGenerator;

    public RegisterCommandHandler(UserManager<ApplicationUser> userManager,
        IMapper mapper,
        IEmailService emailService,
        ILinkGenerator linkGenerator)
    {
        _userManager = userManager;
        _mapper = mapper;
        _emailService = emailService;
        _linkGenerator = linkGenerator;
    }
    public async Task<ErrorOr<RegisterDto>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user != null) return Error.Conflict(description: "User already exists");

        var newUser = _mapper.Map<ApplicationUser>(request);


        var result = await _userManager.CreateAsync(newUser, request.Password);

        if (!result.Succeeded) return Error.Unexpected(description: "Something went wrong, please try register again");

        var confirmEmailToken = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

        confirmEmailToken = HttpUtility.UrlEncode(confirmEmailToken);

        var confirmationLink =
            _linkGenerator.GenerateLink(url: $"api/Auth/ConfirmEmail?token={confirmEmailToken}&email={newUser.Email}");

        await _emailService.SendEmailAsync(toEmailAddress: newUser.Email,
            subject: "Email confirmation from MagazineHub, please click the link",
            message: $"Please click the following link to activate the account: {confirmationLink}");


        return new RegisterDto("Register successfully, please check your email for email confirmation");
    }
}
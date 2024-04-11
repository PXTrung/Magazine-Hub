using Application.Common.Models;
using Domain.Entities;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Features.Auth.Commands.ChangeInitialPassword
{
    public class ChangeInitialPasswordCommandHandler : IRequestHandler<ChangeInitialPasswordCommand, ErrorOr<SuccessResult>>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public ChangeInitialPasswordCommandHandler(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<ErrorOr<SuccessResult>> Handle(ChangeInitialPasswordCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null) return Error.NotFound(description: "Email not found");

            var result = await _userManager.ResetPasswordAsync(user, request.ChangeInitialPasswordToken, request.NewPassword);

            if (!result.Succeeded) return Error.Unexpected(description: "Change password failed, maybe change password token invalid, please try again");

            return new SuccessResult(title: "Change password successfully, now you can login with new password");
        }
    }
}

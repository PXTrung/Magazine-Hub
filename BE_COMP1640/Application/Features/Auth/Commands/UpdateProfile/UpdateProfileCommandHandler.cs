using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Features.Auth.Commands.UpdateProfile
{
    public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand, ErrorOr<SuccessResult>>
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ICurrentUserProvider _currentUserProvider;

        public UpdateProfileCommandHandler(UserManager<ApplicationUser> userManager,
            ICurrentUserProvider currentUserProvider)
        {
            _userManager = userManager;
            _currentUserProvider = currentUserProvider;
        }

        public async Task<ErrorOr<SuccessResult>> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
        {
            var currentUser = _currentUserProvider.GetCurrentUser();
            //check if current user is null
            var user = await _userManager.FindByIdAsync(currentUser.Id.ToString());

            if (user == null) return Error.Unauthorized(description: "User not found");

            user.FirstName = request.FirstName;

            user.LastName = request.LastName;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded) return Error.Unexpected(description: "Updated profile failed, please retry");

            return new SuccessResult(title: "Updated profile successfully!");
        }
    }
}

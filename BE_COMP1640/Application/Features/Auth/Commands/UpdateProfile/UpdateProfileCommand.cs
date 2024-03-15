using ErrorOr;
using MediatR;

namespace Application.Features.Auth.Commands.UpdateProfile
{
    public record UpdateProfileCommand : IRequest<ErrorOr<Success>>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}

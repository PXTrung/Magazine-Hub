using ErrorOr;
using MediatR;

namespace Application.Features.Auth.Commands.Register
{
    public record RegisterCommand : IRequest<ErrorOr<RegisterDto>>
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    };
}

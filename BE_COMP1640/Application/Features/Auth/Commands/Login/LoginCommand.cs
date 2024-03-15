using ErrorOr;
using MediatR;

namespace Application.Features.Auth.Commands.Login
{
    public record LoginCommand : IRequest<ErrorOr<LoginDto>>
    {
        public string Email { get; set; }

        public string Password { get; set; }

    };
}

using ErrorOr;
using MediatR;

namespace Application.Features.Auth.Commands.Login
{
    public record LoginCommand : IRequest<ErrorOr<LoginDto>>
    {

        /// <example>userexample@gmail.com</example>
        public string Email { get; set; }


        /// <example>Abcd@1234</example>
        public string Password { get; set; }

    };
}

using ErrorOr;
using MediatR;

namespace Application.Features.Auth.Commands.Register
{
    public record RegisterCommand : IRequest<ErrorOr<RegisterDto>>
    {

        /// <example>user@example.com</example>
        public string Email { get; set; }

        /// <example>Abcd@1234</example>
        public string Password { get; set; }

        /// <example>Abcd@1234</example>
        public string ConfirmPassword { get; set; }

        /// <example>Khang</example>
        public string FirstName { get; set; }

        /// <example>Le</example>
        public string LastName { get; set; }
    };
}

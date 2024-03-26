﻿using FluentValidation;

namespace Application.Features.Auth.Commands.ResetPassword
{
    public class ResetPasswordCommandValidator : AbstractValidator<ResetPasswordCommand>
    {
        public ResetPasswordCommandValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Email is not valid");


            RuleFor(x => x.OTP)
           .NotEmpty().WithMessage("OTP is required");

            RuleFor(x => x.NewPassword)
                .NotEmpty().WithMessage("New password is required")
                .MinimumLength(8).WithMessage("New password must be at least 8 characters long")
                .Matches("[a-z]").WithMessage("New password must contain at least one lowercase letter")
                .Matches("[A-Z]").WithMessage("New password must contain at least one uppercase letter")
                .Matches("[0-9]").WithMessage("New password must contain at least one digit")
                .Matches("[^a-zA-Z0-9]").WithMessage("New password must contain at least one special character");

            RuleFor(x => x.ConfirmNewPassword)
                .NotEmpty().WithMessage("Password confirmation is required")
                .Equal(x => x.NewPassword).WithMessage("Password confirmation must match the new password");
        }
    }
}

using FluentValidation;

namespace Application.Features.Feedbacks.Commands.CreateFeedback
{
    public class CreateFeedbackCommandValidator : AbstractValidator<CreateFeedbackCommand>
    {
        public CreateFeedbackCommandValidator()
        {
            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("Content must be provided")
                .MaximumLength(255).WithMessage("Content must not exceed 255 characters.");
        }
    }
}

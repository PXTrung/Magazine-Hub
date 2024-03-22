using FluentValidation;

namespace Application.Features.Contributions.Commands.ChangeContributionApproval
{
    public class ChangeContributionApprovalCommandValidator : AbstractValidator<ChangeContributionApprovalCommand>
    {
        public ChangeContributionApprovalCommandValidator()
        {
            RuleFor(command => command.Id).NotEmpty().WithMessage("Id is required");

            RuleFor(command => command.Approved).NotNull().WithMessage("Approved is required");
        }
    }
}

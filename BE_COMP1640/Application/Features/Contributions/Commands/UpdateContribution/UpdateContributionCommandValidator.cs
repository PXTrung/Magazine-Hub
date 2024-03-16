using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Contributions.Commands.UpdateContribution
{
    public class UpdateContributionCommandValidator : AbstractValidator<UpdateContributionCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserProvider _currentUserProvider;

        public UpdateContributionCommandValidator(IApplicationDbContext context, ICurrentUserProvider currentUserProvider)
        {
            _context = context;
            _currentUserProvider = currentUserProvider;
            RuleFor(x => x.Id)
                .MustAsync(IdExists).WithMessage("Contribution not found").WithErrorCode("NotFound");

            RuleFor(x => x.Title)
                .MaximumLength(255).WithMessage("Title must not exceed 255 characters.");

            RuleFor(x => x.Description)
                .MaximumLength(1000).WithMessage("Description must not exceed 1000 characters.");


            RuleFor(x => x.ImageFile)
                .Must(BeAValidImageFile).WithMessage("Unsupported image file extension. Supported extensions: .jpg, .jpeg, .png, .webp")
                .Must(BeUnder20Mb).WithMessage("Image file size should be less than 10MB.")
                .When(x => x.ImageFile != null);


            RuleFor(x => x.DocumentFile)
                .Must(BeAValidDocumentFile).WithMessage("Unsupported document file extension. Supported extensions: .doc, .docx, .pdf")
                .Must(BeUnder20Mb).WithMessage("Document file size should be less than 10MB.")
                .When(x => x.DocumentFile != null);

            RuleFor(x => x)
                .MustAsync(CanUpdateContribution)
                .WithMessage("Contribution not found").WithErrorCode("NotFound");
        }

        private Task<bool> IdExists(Guid id, CancellationToken cancellationToken)
        {
            return _context.Contributions.AnyAsync(p => p.Id == id, cancellationToken);
        }

        private async Task<bool> CanUpdateContribution(UpdateContributionCommand command, CancellationToken cancellationToken)
        {
            var currentUser = _currentUserProvider.GetCurrentUser();
            var contributionEntity = await _context.Contributions.FindAsync(command.Id);
            return contributionEntity?.CreatedById == currentUser.Id;
        }


        private bool BeAValidImageFile(IFormFile? file)
        {
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
            return file != null && allowedExtensions.Contains(Path.GetExtension(file.FileName).ToLower());
        }

        private bool BeAValidDocumentFile(IFormFile? file)
        {
            var allowedExtensions = new[] { ".doc", ".docx", ".pdf" };
            return file != null && allowedExtensions.Contains(Path.GetExtension(file.FileName).ToLower());
        }

        private bool BeUnder20Mb(IFormFile? file)
        {
            return file != null && file.Length <= 20971520;
        }


    }
}

using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Features.Contributions.Commands.CreateContribution
{
    public record CreateContributionCommand : IRequest<ErrorOr<Success>>
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public IFormFile? ImageFile { get; set; }

        public IFormFile? DocumentFile { get; set; }

    }
}

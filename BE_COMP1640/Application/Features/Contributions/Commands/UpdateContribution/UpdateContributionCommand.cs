﻿using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Features.Contributions.Commands.UpdateContribution
{
    public record UpdateContributionCommand : IRequest<ErrorOr<Success>>
    {
        public UpdateContributionCommand(Guid id, string? title, string? description, IFormFile? imageFile, IFormFile? documentFile)
        {
            Id = id;
            Title = title;
            Description = description;
            ImageFile = imageFile;
            DocumentFile = documentFile;
        }

        public Guid Id { get; set; }

        public string? Title { get; set; }

        public string? Description { get; set; }

        public IFormFile? ImageFile { get; set; }

        public IFormFile? DocumentFile { get; set; }
    }
}

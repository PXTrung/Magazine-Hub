﻿using Application.Common.Interfaces;
using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Contributions.Queries.DownloadContribution
{
    public class DownloadContributionQueryHandler : IRequestHandler<DownloadContributionQuery, ErrorOr<byte[]>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IFileService _fileService;

        public DownloadContributionQueryHandler(IApplicationDbContext context,
            IFileService fileService)
        {
            _context = context;
            _fileService = fileService;
        }
        public async Task<ErrorOr<byte[]>> Handle(DownloadContributionQuery request, CancellationToken cancellationToken)
        {
            var documentList = _context.Contributions
                .Where(c => c.DocumentId != null)
                .Include(c => c.Document)
                .Select(c => c.Document)
                .ToList();

            return await _fileService.ZipFilesAsync(documentList, "Documents");
        }
    }
}

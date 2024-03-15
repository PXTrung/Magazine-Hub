using Domain.Common;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

public class Media : AuditableBaseEntity
{
    [NotMapped]
    public IFormFile File { get; set; }

    public string? FileName { get; set; }

    public string? FileExtension { get; set; }

    public string? UrlFilePath { get; set; }

    public string? LocalFilePath { get; set; }

    public long? FileSizeInBytes { get; set; }


}


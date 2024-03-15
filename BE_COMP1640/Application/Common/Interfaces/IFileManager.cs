using Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Interfaces
{
    public interface IFileManager
    {
        Task<Media> SaveFileAsync(IFormFile file, string folderName);

        Task UpdateFileAsync(IFormFile file, string folderName, Media oldFile);

        string GetFileUrl(string folderName, string fileName);

    }
}

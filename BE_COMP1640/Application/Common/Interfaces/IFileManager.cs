using Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Interfaces
{
    public interface IFileManager
    {
        Task<Media> SaveFileAsync(IFormFile file, string folderName);
        string GetFileUrl(string folderName, string fileName);
    }
}

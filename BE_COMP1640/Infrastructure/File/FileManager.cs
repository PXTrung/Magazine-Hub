using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.File
{
    public class FileManager : IFileManager
    {
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IHttpContextAccessor _contextAccessor;

        public FileManager(IWebHostEnvironment hostEnvironment, IHttpContextAccessor contextAccessor)
        {
            _hostEnvironment = hostEnvironment;
            _contextAccessor = contextAccessor;
        }

        public async Task<Media> SaveFileAsync(IFormFile file, string folderName)
        {
            //Get Current Time
            var currentTimeStamp = DateTime.Now.ToString("yyyyMMddHHmmss");

            //Create folder if not exists
            var folderPath = Path.Combine(_hostEnvironment.ContentRootPath, "MediaFiles", folderName);
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            //Save file
            var fileName = $"{Path.GetFileNameWithoutExtension(file.FileName)}_{currentTimeStamp}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(folderPath, fileName);
            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            //Create and return Media entity
            return new Media
            {
                FileName = Path.GetFileNameWithoutExtension(file.FileName),
                FileExtension = Path.GetExtension(file.FileName),
                FileSizeInBytes = file.Length,
                LocalFilePath = filePath,
                UrlFilePath = GetFileUrl(folderName, fileName)
            };
        }

        public string GetFileUrl(string folderName, string fileName)
        {
            var baseUrl = $"{_contextAccessor.HttpContext.Request.Scheme}://{_contextAccessor.HttpContext.Request.Host}{_contextAccessor.HttpContext.Request.PathBase}";
            return $"{baseUrl}/MediaFiles/{folderName}/{fileName}";
        }



    }
}

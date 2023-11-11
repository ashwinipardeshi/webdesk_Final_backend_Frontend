using AdmissionWebAPI.Filters;
using AdmissionWebAPI.Services.Common.Contract;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace AdmissionWebAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [ApiController]
    public class DropBoxFilesController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;
        private readonly string[] AllowedExtensions = { ".jpg", ".png", ".doc", ".pdf" };
        private const long MaxFileSize = 1 * 1024 * 1024; // 1 MB

        private readonly ILogger<DropBoxFilesController> _logger;
        private IDropBoxFilesService _dropBoxFilesService;

        public DropBoxFilesController(ILogger<DropBoxFilesController> logger, IDropBoxFilesService DropBoxFilesService, IWebHostEnvironment environment)
        {
            _logger = logger;
            _dropBoxFilesService = DropBoxFilesService;
            _environment = environment;
        }

        [HttpGet]
        [Route(@"~/GetDocument")]
        public async Task<FileResult> GetDocumentAsync(string filename)
        {
            try
            {
                string _fileExtension = Path.GetExtension(filename).ToLower();

                byte[] fileContent = await _dropBoxFilesService.GetFile(filename);

                string fileExtension = Path.GetExtension(filename)?.ToLower();

                string contentType;

                if (!string.IsNullOrEmpty(_fileExtension))
                {
                    _fileExtension = _fileExtension.ToLower();
                    fileExtension = "png"; // Change this to the actual file extension
                    string mimeType = ImageMimeMapper.GetMimeType(fileExtension);

                    switch (_fileExtension)
                    {
                        case ".pdf":
                            contentType = MediaTypeNames.Application.Pdf;
                            break;
                        case ".txt":
                            contentType = MediaTypeNames.Text.Plain;
                            break;
                        case ".jpg":
                        case ".jpeg":
                            contentType = MediaTypeNames.Image.Jpeg;
                            break;
                        case ".png":
                            contentType = mimeType;
                            break;
                        // Add more cases for other file types as needed
                        default:
                            contentType = MediaTypeNames.Application.Octet;
                            break;
                    }
                }
                else
                {
                    // Handle the case when the file extension is not provided or is empty
                    contentType = MediaTypeNames.Application.Octet;
                }
                // Return the file with the determined content type
                return File(fileContent, contentType, filename);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public class FileUploadModel
        {
            public string? FileName { get; set; }
            public IFormFile? File { get; set; }
        }

        public class ImageMimeMapper
        {
            private static readonly Dictionary<string, string> imageMimeTypes = new Dictionary<string, string>
            {
                    { "jpg", "image/jpeg" },
                    { "jpeg","image/jpeg" },
                    { "png", "image/png" },
                    { "gif", "image/gif" },
                    { "bmp", "image/bmp" },
                    // Add more mappings as needed
             };

            public static string GetMimeType(string fileExtension)
            {
                if (fileExtension == null)
                {
                    throw new ArgumentNullException(nameof(fileExtension));
                }

                if (imageMimeTypes.TryGetValue(fileExtension.ToLower(), out string mimeType))
                {
                    return mimeType;
                }
                else
                {
                    return "application/octet-stream"; // Default MIME type for unknown extensions
                }
            }
        }


        [HttpPost]
        [Route(@"~/SaveDocument")]
        public async Task<ActionResult> SaveUploadedDocumentAsync([FromForm] FileUploadModel uploadedFile)
        {
            try
            {
                if (uploadedFile.File == null || uploadedFile.File.Length == 0)
                {
                    return BadRequest("No file uploaded.");
                }

                if (uploadedFile.File.Length > 1 * 1024 * 1024) // 1 MB limit
                {
                    return BadRequest("File size exceeds the 1 MB limit.");
                }
                string originalFileName = Path.GetFileName(uploadedFile.File.FileName);
                string fileExtension = Path.GetExtension(originalFileName);

                //---------------image disply--------------------
                if (IsImageFile(fileExtension))
                {
                    // For image files (jpg, png, etc.), return the image directly
                    using (var reader = new StreamReader(uploadedFile.File.OpenReadStream()))
                    {
                        var bytes = await ReadStreamAsync(reader.BaseStream);
                        return File(bytes, GetImageContentType(fileExtension));
                    }
                }
                else
                {
                    // For non-image files, save and provide a download link
                    using (var reader = new StreamReader(uploadedFile.File.OpenReadStream()))
                    {
                        var bytes = await ReadStreamAsync(reader.BaseStream);
                        await _dropBoxFilesService.WriteFile(originalFileName, bytes);
                    }
                    return Ok(new { status = true, message = "File Uploaded Successfully" });
                }

                //------------------------------------download file----------------------
                //if (IsImageFile(fileExtension))
                //{
                //    // For image files (jpg, png, etc.), return the image to open in a new window
                //    var fileStream = uploadedFile.File.OpenReadStream();
                //    return new FileStreamResult(fileStream, GetImageContentType(fileExtension))
                //    {
                //        FileDownloadName = originalFileName,
                //        EnableRangeProcessing = true,
                //    };
                //}
                //else
                //{
                //    // For non-image files, save and provide a download link
                //    using (var reader = new StreamReader(uploadedFile.File.OpenReadStream()))
                //    {
                //        var bytes = await ReadStreamAsync(reader.BaseStream);
                //        await _dropBoxFilesService.WriteFile(originalFileName, bytes);
                //    }
                //    return Ok(new { status = true, message = "File Uploaded Successfully" });
                //}



                //------------------------------download file and image disply -----------------
                //    var fileStream = uploadedFile.File.OpenReadStream();
                //    var fileBytes = await ReadStreamAsync(fileStream);

                //    // Set the Content-Disposition header based on file type
                //    var contentDisposition = IsImageFile(fileExtension)
                //        ? "inline; filename=" + originalFileName
                //        : "attachment; filename=" + originalFileName;

                //    // Return the file with the appropriate content type and Content-Disposition header
                //    return File(fileBytes, GetContentType(fileExtension), contentDisposition);          

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = false, message = $"Error: {ex.Message}" });
            }

        }

        private async Task<byte[]> ReadStreamAsync(Stream stream)
        {
            using (var memoryStream = new MemoryStream())
            {
                await stream.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }
        private bool IsImageFile(string fileExtension)
        {
            var imageExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" }; // Add more if needed
            return imageExtensions.Contains(fileExtension.ToLower());
        }

        private string GetImageContentType(string fileExtension)
        {
            switch (fileExtension.ToLower())
            {
                case ".jpg":
                case ".jpeg":
                    return "image/jpeg";
                case ".png":
                    return "image/png";
                case ".gif":
                    return "image/gif";
                // Add more cases for other image formats if needed
                default:
                    return "application/octet-stream";
            }
        }         
    }
}

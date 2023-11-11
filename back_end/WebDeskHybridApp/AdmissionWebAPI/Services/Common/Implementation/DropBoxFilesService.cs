using AdmissionWebAPI.Services.Common.Contract;
using Dropbox.Api;
using Dropbox.Api.Files;

namespace AdmissionWebAPI.Services.Common.Implementation
{
    public class DropBoxFilesService : IDropBoxFilesService
    {
        IConfiguration _IConfiguration;
        public DropBoxFilesService(IConfiguration IConfiguration)
        {
            _IConfiguration = IConfiguration;
        }
        public async Task<byte[]> GetFile(string file)
        {
              string AccessToken = _IConfiguration.GetSection("DropBoxAccessToken").Value;         
            using (var _dropBox = new DropboxClient(AccessToken))
            using (var response = await _dropBox.Files.DownloadAsync("/AkronSystems/" + file))
            {
                return await response.GetContentAsByteArrayAsync();
            }
        }

        public async Task WriteFile(string FileName, byte[] Content)
        {
             string AccessToken = _IConfiguration.GetSection("DropBoxAccessToken").Value;
            using (var _dropBox = new DropboxClient(AccessToken))
            using (var _memoryStream = new MemoryStream(Content))
            {
                var updated = await _dropBox.Files.UploadAsync("/AkronSystems/" + FileName, WriteMode.Overwrite.Instance, body: _memoryStream);
            }
        }
    }
}

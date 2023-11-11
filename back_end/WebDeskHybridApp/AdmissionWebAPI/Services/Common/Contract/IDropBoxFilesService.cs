namespace AdmissionWebAPI.Services.Common.Contract
{
    public interface IDropBoxFilesService
    {
        Task<byte[]> GetFile(string File);
        Task WriteFile(string File, byte[] Content);
    }
}

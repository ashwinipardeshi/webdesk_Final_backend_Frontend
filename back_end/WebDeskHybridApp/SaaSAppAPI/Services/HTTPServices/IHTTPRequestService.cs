namespace SaaSAppAPI.Services.HTTPServices
{
    public interface IHTTPRequestService
    {
        Task<List<T>> HTTPGetAllRequestCall<T>(string apiurl);

        Task<T> HTTPGetRequestCall<T>(string apiurl);

        Task<long?> HTTPPostRequestCall<T>(string apiurl, T data);

        Task<bool?> HTTPPutRequestCall<T>(string apiurl, T data);

        Task<bool?> HTTPDeleteRequestCall(string apiurl);
    }
}

using Newtonsoft.Json;
using System.Text;

namespace SaaSAppAPI.Services.HTTPServices
{
    public class HTTPRequestService : IHTTPRequestService
    {
        public async Task<List<T>> HTTPGetAllRequestCall<T>(string apiurl)
        {
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(apiurl))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        return JsonConvert.DeserializeObject<APIResponseList<T>>(apiResponse).result;
                    }
                    return default(List<T>);
                }
            }
        }

       

        public async Task<T> HTTPGetRequestCall<T>(string apiurl)
        {
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(apiurl))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        return JsonConvert.DeserializeObject<APIResponse<T>>(apiResponse).result;
                    }
                    return default(T);
                }
            }
        }

        public async Task<long?> HTTPPostRequestCall<T>(string apiurl, T data)
        {
            using (var httpClient = new HttpClient())
            {
                var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await httpClient.PostAsync(apiurl, content))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var apiResponse = await response.Content.ReadAsStringAsync();
                        var res = JsonConvert.DeserializeObject<APIResponse<long?>>(apiResponse).result;
                        return res;
                    }
                    return null;
                }
            }
        }

        public async Task<bool?> HTTPPutRequestCall<T>(string apiurl, T data)
        {
            using (var httpClient = new HttpClient())
            {
                var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                using (var response = await httpClient.PutAsync(apiurl, content))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var apiResponse = await response.Content.ReadAsStringAsync();
                        var res = JsonConvert.DeserializeObject<APIResponse<bool>>(apiResponse).result;
                        return res;
                    }
                    return null;
                }
            }
        }

        public async Task<bool?> HTTPDeleteRequestCall(string apiurl)
        {
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.DeleteAsync(apiurl))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        return JsonConvert.DeserializeObject<APIResponse<bool?>>(apiResponse).result;
                    }
                    return null;
                }
            }
        }

        internal class APIResponseList<T> // GetAll
        {
            public List<T> result { get; set; }
        }

        internal class APIResponse<T> //Get/Insert/Update/Delete
        {
            public T result { get; set; }
        }
    }
}

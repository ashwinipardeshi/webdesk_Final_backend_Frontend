using GraphQL;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using ModernHttpClient;
using Newtonsoft.Json;
using VendorMgtMVCApp.Services.GraphQLServices.Contract;
using VendorMgtMVCApp.Utility;

namespace VendorMgtMVCApp.Services.GraphQLServices.Implementation
{
    public class MutationService : IMutationService
    {
        private GraphQLHttpClient graphQLHttpClient;

        public MutationService()
        {
            var uri = new Uri(StaticConfigurationManager.AppSetting["GraphQLAPIS:VendorMgtAPI"]);
            var graphQLOptions = new GraphQLHttpClientOptions
            {
                EndPoint = uri,
                HttpMessageHandler = new NativeMessageHandler(),
            };

            graphQLHttpClient = new GraphQLHttpClient(graphQLOptions, new NewtonsoftJsonSerializer());
        }

        public async Task<T> ExceuteMutationAsyn<T>(string graphQLQueryType, string completeQueryString)
        {
            try
            {
                var request = new GraphQLRequest
                {
                    Query = completeQueryString
                };

                var response = await graphQLHttpClient.SendMutationAsync<object>(request);

                var stringResult = response.Data.ToString();
                stringResult = stringResult.Replace($"\"{graphQLQueryType}\":", string.Empty);
                stringResult = stringResult.Remove(0, 1);
                stringResult = stringResult.Remove(stringResult.Length - 1, 1);

                var result = JsonConvert.DeserializeObject<T>(stringResult);

                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}

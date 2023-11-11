namespace VendorMgtMVCApp.Services.GraphQLServices.Contract
{
    public interface IMutationService
    {
        Task<T> ExceuteMutationAsyn<T>(string graphQLQueryType, string completeQueryString);
    }
}

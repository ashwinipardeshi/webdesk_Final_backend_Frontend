namespace VendorMgtMVCApp.Services.GraphQLServices.Contract
{
    public interface IQueryService
    {
        Task<List<T>> ExceuteQueryReturnListAsyn<T>(string graphQLQueryType, string completeQueryString);
        Task<T> ExceuteQueryAsyn<T>(string graphQLQueryType, string completeQueryString);
    }
}

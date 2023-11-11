using SaaSAppAPI.Services.RESTServices.Contract;
using SaaSAppAPI.ViewModels;

namespace SaaSAppAPI.Services.GraphQLServices
{
    [ExtendObjectType(Name = "Query")]
    [Obsolete]
    public class CollegeSubscriptionQuery
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
       
        public async Task<IEnumerable<CollegeSubscriptionVM?>> AllCollegeSubscriptionAsync([Service] ICollegeSubscriptionService _service)
        {
            return await _service.GetAll();
        }
        /*
         query{
                 allCollegeSubscription{
                    id,
                    subscriptionMasterId,
                    collegeId,
                    fromDate,
                    toDate,
                    price,
                    discount,
                    finalPrice,
                    isActive,
                    createdBy,
                    createdDate,
                    updatedBy,
                    updatedDate
                }
              }
         */
    }
}

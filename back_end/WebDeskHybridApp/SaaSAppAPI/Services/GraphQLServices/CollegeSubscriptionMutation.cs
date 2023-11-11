using SaaSAppAPI.Services.RESTServices.Contract;
using SaaSAppAPI.ViewModels;

namespace SaaSAppAPI.Services.GraphQLServices
{
    [ExtendObjectType(Name = "Mutation")]
    [Obsolete]
    public class CollegeSubscriptionMutation
    {
        public async Task<long?> SaveCollegeSubscriptionAsync([Service] ICollegeSubscriptionService _service, CollegeSubscriptionVM newCollegeSubscription)
        {
            return await _service.Insert(newCollegeSubscription);
        }
        /*
         //Operation
    mutation($newCollegeSubscription:CollegeSubscriptionVMInput!){
          saveCollegeSubscription(newCollegeSubscription:$newCollegeSubscription) 
        }
        //Variable
         {
"newCollegeSubscription":{
                    "id": 0,
                    "subscriptionMasterId": 2,
                    "collegeId": 1,
                    "fromDate": "2023-10-16T10:30:43.303Z",
                    "toDate": "2023-10-16T10:30:43.303Z",
                    "price": 100,
                    "discount": 10,
                    "finalPrice": 90,
                    "isActive": true,
                    "createdBy": 29,
                    "createdDate": "2023-10-16T10:30:43.303Z"       
          }
        }
         */

        public async Task<bool?> UpdateCollegeSubscriptionAsync([Service] ICollegeSubscriptionService _service, CollegeSubscriptionVM updateCollegeSubscription)
        {
            return await _service.Update(updateCollegeSubscription);
        }

        /*
         //Operation
          mutation($updateCollegeSubscription:CollegeSubscriptionVMInput!){
          updateCollegeSubscription(updateCollegeSubscription: $updateCollegeSubscription)           
        }
        //Variable
           {
"updateCollegeSubscription":{
                    "id": 12,
                    "subscriptionMasterId": 2,
                    "collegeId": 1,
                    "fromDate": "2023-10-16T10:30:43.303Z",
                    "toDate": "2023-10-16T10:30:43.303Z",
                    "price": 1000,
                    "discount": 100,
                    "finalPrice": 900,
                    "isActive": true,
                    "createdBy": 29,
                    "createdDate": "2023-10-16T10:30:43.303Z"       
          }
        }
         */

       
    }
}
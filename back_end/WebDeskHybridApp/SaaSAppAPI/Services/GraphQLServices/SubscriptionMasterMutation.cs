using SaaSAppAPI.Services.RESTServices.Contract;
using SaaSAppAPI.ViewModels;

namespace SaaSAppAPI.Services.GraphQLServices
{
    [ExtendObjectType("Mutation")]
    public class SubscriptionMasterMutation 
    {
        public async Task<long?> SaveSubscriptionMasterAsync([Service] ISubscriptionService _service, SubscriptionMasterVM subscription)
        {
            return await _service.Insert(subscription);
        }
        /*
         //Operation

        mutation ($subscription: SubscriptionMasterVMInput!) {
          saveSubscriptionMaster(subscription:$subscription)
           }


        //Variable
         {
          "subscription":{
            "id":0,        
            "name": "Half Yearly", 
            "description": "Half Yearly",     
            "days":365,
            "isActive": true,          
            "createdBy": 1,
            "createdDate": "2023-09-25"          
          }
        }
         */

        public async Task<bool?> UpdateSubscriptionMasterAsync([Service] ISubscriptionService _service, SubscriptionMasterVM subscription)
        {
            return await _service.Update(subscription);
        }

        /*
         //Operation
        mutation ($subscription: SubscriptionMasterVMInput!) {
         updateSubscriptionMaster(subscription: $subscription)                
               }

        // Variable
          {"subscription":{
            "id":9,        
            "name": "Five Yearly", 
            "description": "Five Yearly",      
            "days":365,
            "isActive": true,          
            "createdBy": 1,
            "createdDate": "2023-09-25"  
         } 
        }
         */

        public async Task<bool?> DeleteSubscriptionMasterAsync([Service] ISubscriptionService _service, int id)
        {
            return await _service.Delete(id);
        }

        /*
        //Operation
        mutation($id:Int!){
            deleteSubscriptionMaster(id:$id)
        }
       //Variable
        {
          "id":32
        }
        */
    }
}

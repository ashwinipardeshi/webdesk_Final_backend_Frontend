using SaaSAppAPI.Services.RESTServices.Contract;
using SaaSAppAPI.ViewModels;

namespace SaaSAppAPI.Services.GraphQLServices
{
    [ExtendObjectType("Mutation")]
    public class PricingMutation
    {
        public async Task<long?> SavePricingAsync([Service] IPricingService _service, PricingVM newPricing)
        {
            return await _service.Insert(newPricing);
        }

        /*
         //Operation
         mutation($newCollegeModule:CollegeModuleVMInput!){
          saveCollegeModule(newCollegeModule:$newCollegeModule) 
        }
        //Variable
        {
          "newCollegeMainMaster":{
            "id":0,        
            "name": "LMS Module", 
            "description": "LMS Module",     
            "isActive": true,          
            "createdBy": 1,
            "createdDate": "2023-09-25"          
          }
        }
         */

        public async Task<bool?> UpdatePricingAsync([Service] IPricingService _service, PricingVM updatePricing)
        {
            return await _service.Update(updatePricing);
        }

        /*
         //Operation
            mutation($updatePricing:PricingVMInput!){
          updatePricing(updatePricing: $updatePricing)           
        }
        //Variable
          { 
      "updatePricing":{  
           "id":1,        
            "name": "LMS Module", 
            "description": "LMS Module",     
            "isActive": true,
            "isDeleted":false,
      "createdBy": 48,
      "createdDate": "2023-09-13T11:25:24.767",
      "updatedBy": 48,
      "updatedDate": "2023-09-13T11:25:59.73"
            }
 }       
         */

        public async Task<bool?> DeletePricingAsync([Service] IPricingService _service, int id)
        {
            return await _service.Delete(id);
        }

        /*
        //Operation
        mutation($id:Int!){
            deletePricing(id:$id)
        }
       //Variable
        {
          "id":32
        }
        */
    }
}

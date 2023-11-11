using SaaSAppAPI.Services.RESTServices.Contract;
using SaaSAppAPI.ViewModels;

namespace SaaSAppAPI.Services.GraphQLServices
{
    [ExtendObjectType("Mutation")]
    public class CollegeModuleMutation
    {
        public async Task<long?> SaveCollegeModuleAsync([Service] ICollegeModuleService _service, CollegeModuleVM newCollegeModule)
        {
            return await _service.Insert(newCollegeModule);
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

        public async Task<bool?> UpdateCollegeModuleAsync([Service] ICollegeModuleService _service, CollegeModuleVM updateCollegeModule)
        {
            return await _service.Update(updateCollegeModule);
        }

        /*
         //Operation
            mutation($updateCollegeModule:CollegeModuleVMInput!){
          updateCollegeModule(updateCollegeModule: $updateCollegeModule)           
        }
        //Variable
          { 
      "updateCollegeModule":{  
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

        public async Task<bool?> DeleteCollegeModuleAsync([Service] ICollegeModuleService _service, int id)
        {
            return await _service.Delete(id);
        }

        /*
        //Operation
        mutation($id:Int!){
            deleteCollegeModule(id:$id)
        }
       //Variable
        {
          "id":32
        }
        */
    }
}

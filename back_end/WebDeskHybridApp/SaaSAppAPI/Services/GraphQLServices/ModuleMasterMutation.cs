using SaaSAppAPI.Services.RESTServices.Contract;
using SaaSAppAPI.ViewModels;

namespace SaaSAppAPI.Services.GraphQLServices
{
    [ExtendObjectType("Mutation")]
    public class ModuleMasterMutation
    {
        public async Task<long?> SaveModuleMasterAsync([Service] IModuleService _service, ModuleMasterGraphVM newModule)
        {
            return await _service.Insert(newModule);
        }
        /*
         //Operation
         mutation($newModule:ModuleMasterGraphVMInput!){
          saveModuleMaster(newModule:$newModule) 
        }
        //Variable
        {
          "newModule":{
            "id":0,        
            "name": "LMS Module", 
            "description": "LMS Module",     
            "isActive": true,          
            "createdBy": 1,
            "createdDate": "2023-09-25"          
          }
        }
         */

        public async Task<bool?> UpdateModuleMasterAsync([Service] IModuleService _service, ModuleMasterGraphVM updateModule)
        {
            return await _service.Update(updateModule);
        }

        /*
         //Operation
          mutation($updateModule:ModuleMasterGraphVMInput!){
          updateModuleMaster(updateModule: $updateModule)           
        }
        //Variable
         "updateModule":
          {
           "id":9,        
            "name": "LMS Module", 
            "description": "LMS Module",     
            "isActive": true,          
            "createdBy": 1,
            "createdDate": "2023-09-25"   
            }
        }
         */

        //public async Task<bool?> DeleteExamAsync([Service] IModuleMasterService _service, int id)
        //{
        //    return await _service.Delete(id);
        //}

        /*
        //Operation
        mutation($id:Int!){
            deleteExam(id:$id)
        }
       //Variable
        {
          "id":32
        }
        */
    }
}

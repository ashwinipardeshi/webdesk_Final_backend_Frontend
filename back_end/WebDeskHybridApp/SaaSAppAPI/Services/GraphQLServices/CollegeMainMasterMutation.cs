using SaaSAppAPI.Services.RESTServices.Contract;
using SaaSAppAPI.ViewModels;

namespace SaaSAppAPI.Services.GraphQLServices
{
    [ExtendObjectType("Mutation")]
    public class CollegeMainMasterMutation
    {
        public async Task<long?> SaveCollegeMainMasterAsync([Service] ICollegeMainMasterService _service, CommonMainCollegeMasterVM newCollegeMain)
        {
            return await _service.Insert(newCollegeMain);
        }
        /*
         //Operation
         mutation($newCollegeMain:CollegeMainMasterVMInput!){
          saveCollegeMainMaster(newCollegeMain:$newCollegeMain) 
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

        public async Task<bool?> UpdateCollegeMainMasterAsync([Service] ICollegeMainMasterService _service, CollegeMainMasterVM updateCollegeMain)
        {
            return await _service.Update(updateCollegeMain);
        }

        /*
         //Operation
            mutation($updateCollegeMain:CollegeMainMasterVMInput!){
          updateCollegeMainMaster(updateCollegeMain: $updateCollegeMain)           
        }
        //Variable
          { 
      "updateCollegeMain":{  
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

        public async Task<bool?> DeleteCollegeMainMasterAsync([Service] ICollegeMainMasterService _service, int id)
        {
            return await _service.Delete(id);
        }

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


using Humanizer;
using VendorMgtWebAPI.Services.RESTServices.Contract;
using VendorMgtWebAPI.ViewModels;

namespace VendorMgtWebAPI.Services.GraphQLServices
{
    [ExtendObjectType("Mutation")]
    public class VendorMasterMutation
    {
        public async Task<long?> InsertVendorMasterAsync([Service] IVendorMasterService _service, VendorMasterVM vendorMasterVM)
        {
            if (vendorMasterVM == null)
                return null;
            return await _service.Insert(vendorMasterVM);
        }
        /*
        //Operation
        mutation($vendorMasterVM:VendorMasterVMInput!){
        saveVendorMaster(newVendor:$vendorMasterVM) 
       }
       //Variable
       {
         "newVendorMaster":{
           "id":0,        
           "name": "LMS Module", 
           "description": "LMS Module",     
           "isActive": true,          
           "createdBy": 1,
           "createdDate": "2023-09-25"          
         }
       }
        */

        public async Task<bool?> UpdateVendorMasterAsync([Service] IVendorMasterService _service, VendorMasterVM vendorMasterVM)
        {
            if (vendorMasterVM == null)
                return null;
            return await _service.Update(vendorMasterVM);
        }

        /*
        //Operation
         mutation($updateVendor:VendorMasterVMInput!){
         updateVendorMaster(updateVendor: $updateVendor)           
       }
       //Variable
        "updateVendor":
         {
          "id":15,        
           "name": "siddhi", 
            "collegeId":1, 
            "address":"kolhpur",
                  "contactNo":"87878787",
                  "gstno":"HGSYTW7",
                  "pan":"JSHSJH3",
                  "tan":"JSHSJ67",
                  "emailId":"siddhi@gmail.com", 
                   "website":"WWW.com", 
           "isActive": true,          
           "createdBy": 22,
           "createdDate": "2023-09-25",
            "updatedBy":0,
                  "updatedDate":"2023-10-20T10:30:20.48"     
           }
       }
        */
        public async Task<bool?> DeleteVendorMasterAsync([Service] IVendorMasterService _service,long id)
        {
            if (id < 0)
                return null;
            return await _service.Delete(id);
        }
        /* mutation($id:Int!)
         {
             deleteVendor(id:$id)
         }
        {
           "id":32
         }
        */
    }
}

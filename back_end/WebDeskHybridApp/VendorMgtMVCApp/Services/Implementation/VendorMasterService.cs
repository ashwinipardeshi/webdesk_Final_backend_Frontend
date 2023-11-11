using VendorMgtMVCApp.Services.Contract;
using VendorMgtMVCApp.Services.GraphQLServices.Contract;
using VendorMgtMVCApp.ViewModels;
using VendorMgtMVCApp.ViewModels.Common;

namespace VendorMgtMVCApp.Services.Implementation
{

    public class VendorMasterService : IVendorMasterService
    {
        private readonly IQueryService _queryService;
        private readonly IMutationService _mutationService;
        public VendorMasterService(IQueryService queryService, IMutationService mutationService)
        {
            _queryService = queryService;
            _mutationService = mutationService;
        }

        public async Task<List<VendorMasterVM?>> Get(long id)
        {
            try
            {
                string completeQuery = $"query{{allVendorMaster(where: {{ id: {{ eq: {id} }}}}){{id,name,address,contactNo,gstno,pan,tan,emailId,website,isActive,createdBy,createdDate}}}}";
                string graphQLQueryType = "allVendorMaster";
                var res = await _queryService.ExceuteQueryReturnListAsyn<VendorMasterVM?>(graphQLQueryType, completeQuery);
                return res.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<List<VendorMasterVM?>> GetAll()
        {
            string completeQuery = "query{allVendorMaster{id,name,address,contactNo,gstno,pan,tan,emailId,website,isActive,createdBy,createdDate}}";
            string graphQLQueryType = "allVendorMaster";
            var res = await _queryService.ExceuteQueryReturnListAsyn<VendorMasterVM?>(graphQLQueryType, completeQuery);
            return res.ToList();
        }

        public async Task<List<GetOption?>> GetOptions()
        {
            string completeQuery = "query{allVendorMaster{id,name}}";
            string graphQLQueryType = "allVendorMaster";
            var res = await _queryService.ExceuteQueryReturnListAsyn<GetOption?>(graphQLQueryType, completeQuery);
            return res.ToList();
        }

        public async Task<long?> Insert(VendorMasterVM vendorMasterVM)
        {
            string completeQuery = $"mutation{{insertVendorMaster(vendorMasterVM: {{id:0,name:\"{vendorMasterVM.Name}\",collegeId:{vendorMasterVM.CollegeId},address:\"{vendorMasterVM.Address}\",contactNo:\"{vendorMasterVM.ContactNo}\",gstno:\"{vendorMasterVM.Gstno}\",pan:\"{vendorMasterVM.Pan}\",tan:\"{vendorMasterVM.Tan}\",emailId:\"{vendorMasterVM.EmailId}\",website:\"{vendorMasterVM.Website}\",isActive:{vendorMasterVM.IsActive.ToString().ToLower()},isDeleted:false,createdBy:1,createdDate:\"2023-10-22T10:25:39.59\"}})}}";
            // string completeQuery = $"mutation{{saveVendorMaster(newVendor: {{id: 0,name: \"{vendorMasterVM.Name}\",collegeId:{vendorMasterVM.CollegeId}, collegeName: \"\", address: \"{vendorMasterVM.Address}\",contactNo: \"{vendorMasterVM.ContactNo}\",gstno: \"{vendorMasterVM.Gstno}\",pan:\"{vendorMasterVM.Pan}\",tan: \"{vendorMasterVM.Tan}\",emailId: \"{vendorMasterVM.EmailId}\",website: \"{vendorMasterVM.Website}\",isActive: {vendorMasterVM.IsActive.ToString().ToLower()},isDeleted: false,createdBy: 1,createdDate: \"2023-10-22T10:25:39.59\"}})}}";

            string graphQLQueryType = "insertVendorMaster";
            var result = await _mutationService.ExceuteMutationAsyn<long?>(graphQLQueryType, completeQuery);
            if (result > 0)
                return result;
            return null;
        }

        public async Task<bool?> Update(VendorMasterVM vendorMasterVM)
        {
            string completeQuery = $"mutation{{updateVendorMaster(vendorMasterVM: {{id:{vendorMasterVM.Id},name:\"{vendorMasterVM.Name}\",collegeId:{vendorMasterVM.CollegeId},address:\"{vendorMasterVM.Address}\",contactNo:\"{vendorMasterVM.ContactNo}\",gstno:\"{vendorMasterVM.Gstno}\",pan:\"{vendorMasterVM.Pan}\",tan:\"{vendorMasterVM.Tan}\",emailId:\"{vendorMasterVM.EmailId}\",website:\"{vendorMasterVM.Website}\",isActive:{vendorMasterVM.IsActive.ToString().ToLower()},isDeleted:false,createdBy:1,createdDate:\"2023-10-22T10:25:39.59\"}})}}";
            string graphQLQueryType = "updateVendorMaster";
            var result = await _mutationService.ExceuteMutationAsyn<bool?>(graphQLQueryType, completeQuery);
            if (result.HasValue)
                return true;
            return null;
        }


        public async Task<bool?> Delete(long id)
        {
            string completeQuery = $"mutation{{deleteVendorMaster(id: {id})}}";
            string graphQLQueryType = "deleteVendorMaster";
            var result = await _mutationService.ExceuteMutationAsyn<bool?>(graphQLQueryType, completeQuery);
            if (result.HasValue)
                return true;
            return null;
        }
    }
}

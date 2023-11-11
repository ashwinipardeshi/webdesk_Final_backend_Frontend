using VendorMgtMVCApp.Services.Contract;
using VendorMgtMVCApp.Services.GraphQLServices.Contract;
using VendorMgtMVCApp.ViewModels;
using VendorMgtMVCApp.ViewModels.Common;

namespace VendorMgtMVCApp.Services.Implementation
{
    public class VendorBanksMaster : IVendorBanksMaster
    {
        private readonly IQueryService _queryService;
        private readonly IMutationService _mutationService;
        public VendorBanksMaster(IQueryService queryService, IMutationService mutationService)
        {
            _queryService = queryService;
            _mutationService = mutationService;
        }

        public async Task<List<VendorBanksMasterVM?>> GetAll()
        {
            string completeQuery = "query{allVendorBanksMaster{id,name,branchName,accountName,accountType,accountNo,ifsccode,isActive,createdBy,createdDate}}";
            string graphQLQueryType = "allVendorBanksMaster";
            var res = await _queryService.ExceuteQueryReturnListAsyn<VendorBanksMasterVM?>(graphQLQueryType, completeQuery);
            return res.ToList();
        }

        public async Task<List<VendorBanksMasterVM?>> Get(long id)
        {
            string completeQuery = $"query{{allVendorBanksMaster(where: {{ id: {{ eq: {id} }}}}){{id,name,branchName,accountName,accountType,accountNo,ifsccode,isActive,createdBy,createdDate}}}}";
            string graphQLQueryType = "allVendorBanksMaster";
            var res = await _queryService.ExceuteQueryReturnListAsyn<VendorBanksMasterVM?>(graphQLQueryType, completeQuery);
            return res.ToList();
        }

        public async Task<List<GetOption?>> GetOptions()
        {
            string completeQuery = "query{allVendorBanksMaster{id,name}}";
            string graphQLQueryType = "allVendorBanksMaster";
            var res = await _queryService.ExceuteQueryReturnListAsyn<GetOption?>(graphQLQueryType, completeQuery);
            return res.ToList();
        }

        public async Task<long?> Insert(VendorBanksMasterVM vendorBanksMasterVM)
        {
            //string completeQuery = "mutation{insertVendorBanksMaster(vendorBanksMasterVM: {id: 0,vendorMasterId: 2,vendorName: \"\",name: \"delhi\",branchName: \"saving\",accountName:\"naznin\",accountType: \"saving\",accountNo: \"678\",ifsccode: \"3456\",isActive: true,isDeleted: false,createdBy: 1,createdDate: \"2023-10-22T10:25:39.59\"})}";
            string completeQuery = $"mutation{{insertVendorBanksMaster(vendorBanksMasterVM: {{id: 0,vendorMasterId: {vendorBanksMasterVM.VendorMasterId},vendorName: \"\",name: \"{vendorBanksMasterVM.Name}\",collegeId:{vendorBanksMasterVM.CollegeId}, collegeName: \"\", branchName: \"{vendorBanksMasterVM.BranchName}\",accountName:\"{vendorBanksMasterVM.AccountName}\",accountType: \"{vendorBanksMasterVM.AccountType}\",accountNo: \"{vendorBanksMasterVM.AccountNo}\",ifsccode: \"{vendorBanksMasterVM.Ifsccode}\",isActive: {vendorBanksMasterVM.IsActive.ToString().ToLower()},createdBy: 1,createdDate: \"2023-10-22T10:25:39.59\"}})}}";
            string graphQLQueryType = "insertVendorBanksMaster";
            var result = await _mutationService.ExceuteMutationAsyn<long?>(graphQLQueryType, completeQuery);
            if (result > 0)
                return result;
            return null;
        }

        public async Task<bool?> Update(VendorBanksMasterVM vendorBanksMasterVM)
        {
            //string completeQuery = $"mutation{{vendorBanksMasterVM(vendorMasterId:\"{vendorBanksMasterVM.Name}\",name:\"{vendorBanksMasterVM.Name}\",branchName:\"{vendorBanksMasterVM.BranchName}\",accountName:\"{vendorBanksMasterVM.AccountName}\",accountType:\"{vendorBanksMasterVM.AccountType}\",accountNo:\"{vendorBanksMasterVM.AccountNo}\",ifsccode:\"{vendorBanksMasterVM.Ifsccode}\",isActive:\"{vendorBanksMasterVM.IsActive}\",isDeleted:\"{vendorBanksMasterVM.IsDeleted}\",createdBy:\"{vendorBanksMasterVM.CreatedBy}\")}}";
            //string completeQuery = $"mutation{{insertVendorBanksMaster(vendorBanksMasterVM: {{id: 0,vendorMasterId: 2,vendorName: \"\",name: \"pune\",branchName: \"saving\",accountName: \"naznin\",accountType: \"saving\",accountNo: \"678\",ifsccode: \"3456\",isActive: true,isDeleted: false,createdBy: 1,createdDate: \"2023-10-22T10:25:39.59\"}})}}";
            string completeQuery = $"mutation{{updateVendorBanksMaster(vendorBanksMasterVM: {{id: {vendorBanksMasterVM.Id},vendorMasterId: {vendorBanksMasterVM.VendorMasterId},vendorName: \"\",name: \"{vendorBanksMasterVM.Name}\",collegeId:{vendorBanksMasterVM.CollegeId}, collegeName: \"\",branchName: \"{vendorBanksMasterVM.BranchName}\",accountName:\"{vendorBanksMasterVM.AccountName}\",accountType: \"{vendorBanksMasterVM.AccountType}\",accountNo: \"{vendorBanksMasterVM.AccountNo}\",ifsccode: \"{vendorBanksMasterVM.Ifsccode}\",isActive: {vendorBanksMasterVM.IsActive.ToString().ToLower()},createdBy: 1,createdDate: \"2023-10-22T10:25:39.59\"}})}}";
            string graphQLQueryType = "vendorBanksMasterVM";
            var result = await _mutationService.ExceuteMutationAsyn<bool?>(graphQLQueryType, completeQuery);
            if (result.HasValue)
                return true;
            return null;
        }

        public async Task<bool?> Delete(long id)
        {
            string completeQuery = $"mutation{{deleteVendorBanksMaster(id: {id})}}";
            string graphQLQueryType = "deleteVendorBanksMaster";
            var result = await _mutationService.ExceuteMutationAsyn<bool?>(graphQLQueryType, completeQuery);
            if (result.HasValue)
                return true;
            return null;
        }
    }
}

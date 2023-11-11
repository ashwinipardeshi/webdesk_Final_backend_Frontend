using VendorMgtMVCApp.Services.Contract;
using VendorMgtMVCApp.Services.GraphQLServices.Contract;
using VendorMgtMVCApp.ViewModels;
using VendorMgtMVCApp.ViewModels.Common;

namespace VendorMgtMVCApp.Services.Implementation
{
    public class VendorBillService : IVendorBillService
    {
        private readonly IQueryService _queryService;
        private readonly IMutationService _mutationService;
        public VendorBillService(IQueryService queryService, IMutationService mutationService)
        {
            _queryService = queryService;
            _mutationService = mutationService;
        }

        #region GetAll
        public async Task<List<VendorBillVM?>> GetAll()
        {
            try
            {
                string completeQuery = "query{allVendorBills{id,vendorMasterId,vendorName,collegeId,collegeName,bankMasterId,bankName,finalBill,advanceBill,billNo,inwardNo,billDate,inwardDate,basicBillAmount,advanceAmountGiven,cgst,sgst,igst,ugst,gsttotal,totalBillAmount,advance,balance,tds,section,tdsamount,securityDeposite,otherRecovery,finalPayableAmount,debitAccountNumberId,tan,remark,isActive,createdBy,createdDate}}";
                string graphQLQueryType = "allVendorBills";
                var res = await _queryService.ExceuteQueryReturnListAsyn<VendorBillVM?>(graphQLQueryType, completeQuery);
                return res.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion GetAll

        #region Get
        public async Task<List<VendorBillVM?>> Get(long id)
        {
            if (id > 0){ 
                try
                {
                    string completeQuery = $"query{{allVendorBills(where: {{ id: {{ eq: {id} }}}}){{id,vendorMasterId,vendorName,collegeId,collegeName,bankMasterId,bankName,finalBill,advanceBill,billNo,inwardNo,billDate,inwardDate,basicBillAmount,advanceAmountGiven,cgst,sgst,igst,ugst,gsttotal,totalBillAmount,advance,balance,tds,section,tdsamount,securityDeposite,otherRecovery,finalPayableAmount,debitAccountNumberId,tan,remark,isActive,createdBy,createdDate}}}}";
                    string graphQLQueryType = "allVendorBills";
                    var res = await _queryService.ExceuteQueryReturnListAsyn<VendorBillVM?>(graphQLQueryType, completeQuery);
                    return res.ToList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return null;
        }
        #endregion Get

        #region GetOptions
        public async Task<List<GetOption?>> GetOptions()
        {
            try
            {
                string completeQuery = "query{allVendorMaster{id,name}}";
                string graphQLQueryType = "allVendorMaster";
                var res = await _queryService.ExceuteQueryReturnListAsyn<GetOption?>(graphQLQueryType, completeQuery);
                return res.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion GetOptions

        #region GetAccountOptions
        public async Task<List<GetAccountOptions?>> GetAccountOptions()
        {
            try
            {
                string completeQuery = "query{allVendorBanksMaster{id,accountNo}}";
                string graphQLQueryType = "allVendorBanksMaster";
                var res = await _queryService.ExceuteQueryReturnListAsyn<GetAccountOptions?>(graphQLQueryType, completeQuery);
                return res.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion GetAccountOptions

        #region Insert
        public async Task<long?> Insert(VendorBillVM vendorBill)
        {
            if (vendorBill != null) {
                //string completeQuery = $"mutation{{saveVendorBills(vendorBill: {{id: 0,vendorMasterId: {vendorBill.VendorMasterId},vendorName: \"\",collegeId:{vendorBill.CollegeId}, collegeName: \"\",bankMasterId: {vendorBill.BankMasterId}, bankName: \"\", finalBill:{vendorBill.FinalBill.ToString().ToLower()},advanceBill:{vendorBill.AdvanceBill.ToString().ToLower()},billNo:\"{vendorBill.BillNo}\",billDate: \"{vendorBill.BillDate}\",inwardNo: \"{vendorBill.InwardNo}\",inwardDate: \"{vendorBill.InwardDate}\",basicBillAmount: {vendorBill.BasicBillAmount},advanceAmountGiven: {vendorBill.AdvanceAmountGiven},cgst: {vendorBill.Cgst},sgst: {vendorBill.Sgst},igst: {vendorBill.Igst},ugst: {vendorBill.Ugst},gsttotal: {vendorBill.Gsttotal},totalBillAmount: {vendorBill.TotalBillAmount},advance: {vendorBill.Advance},balance: {vendorBill.Balance},tds: {vendorBill.Tds},section:\"{vendorBill.Section}\",tdsamount: {vendorBill.Tdsamount},securityDeposite: {vendorBill.SecurityDeposite},otherRecovery: {vendorBill.OtherRecovery},finalPayableAmount: {vendorBill.FinalPayableAmount},tan:\"{vendorBill.Tan}\",remark: \"{vendorBill.Remark}\",isActive: {vendorBill.IsActive.ToString().ToLower()},isDeleted: false,createdBy: 1,createdDate: \"2023-10-22T10:25:39.59\"}})}}";
                string completeQuery = $"mutation{{saveVendorBills(vendorBill: {{id: 0,vendorMasterId: {vendorBill.VendorMasterId},vendorName: \"\",collegeId:{vendorBill.CollegeId}, collegeName: \"\",bankMasterId: {vendorBill.BankMasterId}, bankName: \"\", finalBill:{vendorBill.FinalBill.ToString().ToLower()},advanceBill:{vendorBill.AdvanceBill.ToString().ToLower()},billNo:\"{vendorBill.BillNo}\",billDate: \"{vendorBill.BillDate}\",inwardNo: \"{vendorBill.InwardNo}\",inwardDate: \"{vendorBill.InwardDate}\",basicBillAmount: {vendorBill.BasicBillAmount},advanceAmountGiven: {vendorBill.AdvanceAmountGiven},cgst: {vendorBill.Cgst ?? 0},sgst: {vendorBill.Sgst ?? 0},igst: {vendorBill.Igst ?? 0},ugst: {vendorBill.Ugst ?? 0},gsttotal: {vendorBill.Gsttotal ?? 0},totalBillAmount: {vendorBill.TotalBillAmount},advance: {vendorBill.Advance},balance: {vendorBill.Balance},tds: {vendorBill.Tds},section:\"{vendorBill.Section}\",tdsamount: {vendorBill.Tdsamount},securityDeposite: {vendorBill.SecurityDeposite},otherRecovery: {vendorBill.OtherRecovery},finalPayableAmount: {vendorBill.FinalPayableAmount},debitAccountNumberId: {vendorBill.DebitAccountNumberId},tan:\"{vendorBill.Tan}\",remark: \"{vendorBill.Remark}\",isActive: {vendorBill.IsActive.ToString().ToLower()},isDeleted: false,createdBy: 1,createdDate: \"2023-10-22T10:25:39.59\"}})}}";
                string graphQLQueryType = "saveVendorBills";
                var result = await _mutationService.ExceuteMutationAsyn<long?>(graphQLQueryType, completeQuery);
                if (result > 0)
                    return result;
            }
            return null;
        }
        #endregion Insert

        #region VendorMasterInsert
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
        #endregion VendorMasterInsert

        #region VendorBank
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
        #endregion VendorBank

        #region Update
        public async Task<bool?> Update(VendorBillVM updateBill)
        {
            if (updateBill != null) { 
                string completeQuery = $"mutation{{updateVendorBill(updateBill: {{id: {updateBill.Id},vendorMasterId: 1,vendorName: \"\",collegeId:1, collegeName: \"\",bankMasterId: 1, bankName: \"\", finalBill:{updateBill.FinalBill.ToString().ToLower()},advanceBill:{updateBill.AdvanceBill.ToString().ToLower()},billNo:\"{updateBill.BillNo}\",billDate: \"{updateBill.BillDate}\",inwardNo: \"{updateBill.InwardNo}\",inwardDate: \"{updateBill.InwardDate}\",basicBillAmount: {updateBill.BasicBillAmount},advanceAmountGiven: {updateBill.AdvanceAmountGiven},cgst: {updateBill.Cgst ?? 0},sgst: {updateBill.Sgst ?? 0},igst: {updateBill.Igst ?? 0},ugst: {updateBill.Ugst ?? 0},gsttotal: {updateBill.Gsttotal ?? 0},totalBillAmount: {updateBill.TotalBillAmount},advance: {updateBill.Advance},balance: {updateBill.Balance},tds: {updateBill.Tds},section:\"{updateBill.Section}\",tdsamount: {updateBill.Tdsamount},securityDeposite: {updateBill.SecurityDeposite},otherRecovery: {updateBill.OtherRecovery},finalPayableAmount: {updateBill.FinalPayableAmount},debitAccountNumberId: {updateBill.DebitAccountNumberId},tan:\"{updateBill.Tan}\",remark: \"{updateBill.Remark}\",isActive: {updateBill.IsActive.ToString().ToLower()},isDeleted: false,createdBy: 1,createdDate: \"2023-10-22T10:25:39.59\"}})}}";
                string graphQLQueryType = "updateVendorBill";
                var result = await _mutationService.ExceuteMutationAsyn<bool?>(graphQLQueryType, completeQuery);
                if (result.HasValue)
                    return true;
            }
            return null;
        }
        #endregion Update

        #region Delete
        public async Task<bool?> Delete(long id)
        {
            if (id > 0){
                string completeQuery = $"mutation{{deleteVendorBill(id: {id})}}";
                string graphQLQueryType = "deleteVendorBill";
                var result = await _mutationService.ExceuteMutationAsyn<bool?>(graphQLQueryType, completeQuery);
                if (result.HasValue)
                    return true;
            }
            return null;
        }
        #endregion Delete
    }
}

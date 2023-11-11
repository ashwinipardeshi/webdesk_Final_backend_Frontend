using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Net;
using VendorMgtWebAPI.Models;
using VendorMgtWebAPI.Services.RESTServices.Contract;
using VendorMgtWebAPI.Utility;
using VendorMgtWebAPI.ViewModels;
using VendorMgtWebAPI.ViewModels.Common;

namespace VendorMgtWebAPI.Services.RESTServices.Implementation
{
    public class VendorBillsServices : IVendorBillsServices
    {
        private readonly VendorMgtDevFinalDbContext _context;
        public VendorBillsServices(VendorMgtDevFinalDbContext context)
        {
            _context = context;
        }

        #region GetAll
        /// <summary>
        /// GetAll
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<VendorBillVM?>> GetAll()
        {
            return await _context.VendorBills.Where(vb => vb.IsActive && vb.IsDeleted == false).OrderByDescending(vb => vb.Id).Select(vb => new VendorBillVM()
            {
                Id = vb.Id,
                VendorMasterId = vb.VendorMasterId,
                VendorName = "",
                CollegeId = vb.CollegeId,
                CollegeName = "",
                BankMasterId = vb.BankMasterId,
                BankName = "",
               // BillType = v.BillType,
                FinalBill= vb.FinalBill,
                AdvanceBill = vb.AdvanceBill,
                BillNo = vb.BillNo,
                BillDate = vb.BillDate,
                InwardNo = vb.InwardNo,
                InwardDate = vb.InwardDate,
                BasicBillAmount = vb.BasicBillAmount,
                AdvanceAmountGiven = vb.AdvanceAmountGiven,
                Cgst = vb.Cgst,
                Sgst = vb.Sgst,
                Igst = vb.Igst,
                Ugst = vb.Ugst,
                Gsttotal = vb.Gsttotal,
                TotalBillAmount = vb.TotalBillAmount,
                Advance = vb.Advance,
                Balance = vb.Balance,
                Tds = vb.Tds,
                Section = vb.Section,
                Tdsamount = vb.Tdsamount,
                SecurityDeposite = vb.SecurityDeposite,
                OtherRecovery = vb.OtherRecovery,
                FinalPayableAmount = vb.FinalPayableAmount,
                DebitAccountNumberId = vb.DebitAccountNumberId,
                Tan = vb.Tan,
                Remark = vb.Remark,
                CreatedBy = vb.CreatedBy,
                CreatedDate = DateTime.UtcNow
            }).ToListAsync<VendorBillVM>();
        }
        #endregion GetAll

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="vendorBillVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(VendorBillVM vendorBillVM)
        {       
            EntityEntry<VendorBill> created = await _context.VendorBills.AddAsync(new VendorBill()
            {            
                VendorMasterId = vendorBillVM.VendorMasterId,
                CollegeId = vendorBillVM.CollegeId,
                BankMasterId = vendorBillVM.BankMasterId,
                FinalBill = vendorBillVM.FinalBill,
                AdvanceBill = vendorBillVM.AdvanceBill,
                BillNo = vendorBillVM.BillNo,
                BillDate = vendorBillVM.BillDate,
                InwardNo = vendorBillVM.InwardNo,
                InwardDate = vendorBillVM.InwardDate,
                BasicBillAmount = vendorBillVM.BasicBillAmount,
                AdvanceAmountGiven = vendorBillVM.AdvanceAmountGiven,
                Cgst = vendorBillVM.Cgst,
                Sgst = vendorBillVM.Sgst,
                Igst = vendorBillVM.Igst,
                Ugst = vendorBillVM.Ugst,
                Gsttotal = vendorBillVM.Gsttotal,
                TotalBillAmount = vendorBillVM.TotalBillAmount,
                Advance = vendorBillVM.Advance,
                Balance = vendorBillVM.Balance,
                Tds = vendorBillVM.Tds,
                Section = vendorBillVM.Section,
                Tdsamount = vendorBillVM.Tdsamount,
                SecurityDeposite = vendorBillVM.SecurityDeposite,
                OtherRecovery = vendorBillVM.OtherRecovery,
                FinalPayableAmount = vendorBillVM.FinalPayableAmount,
                DebitAccountNumberId = vendorBillVM.DebitAccountNumberId,
                Tan = vendorBillVM.Tan,
                Remark = vendorBillVM.Remark,
                IsActive = vendorBillVM.IsActive,
                IsDeleted = false,
                CreatedBy = 1,
                CreatedDate = DateTime.UtcNow
            });
            var entry = _context.ChangeTracker.Entries().FirstOrDefault();
            if (_context.SaveChanges() > 0)
            {
                if (entry != null)
                {
                    long tableId = created.Entity.Id;
                    await CommonActivities.ActivityLog(new ActivityLogVM()
                    {
                        _context = _context,
                        UserId = 1,
                        TableName = entry.Entity.GetType().Name.ToString(),
                        TableId = tableId,
                        Operation = EntityState.Added.ToString(),
                        CollegeId = 1,
                       Ipaddress = null
                    });
                    return tableId;
                }
            }
            return null;
        }
        #endregion Insert

        #region Update
        /// <summary>
        /// Update
        /// </summary>
        /// <param name="vendorBillVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(VendorBillVM vendorBillVM)
        {
            var vendorBillMasters = await _context.VendorBills.FirstOrDefaultAsync(e => e.Id == vendorBillVM.Id);
            if (vendorBillMasters != null)
            {
                vendorBillMasters.VendorMasterId = vendorBillVM.VendorMasterId;
                vendorBillMasters.CollegeId = vendorBillVM.CollegeId;
                vendorBillMasters.BankMasterId = vendorBillVM.BankMasterId;
                //vendorBillMasters.BillType = vendorBillVM.BillType;
                vendorBillMasters.FinalBill = vendorBillVM.FinalBill;
                vendorBillMasters.AdvanceBill = vendorBillVM.AdvanceBill;
                vendorBillMasters.BillNo = vendorBillVM.BillNo;
                vendorBillMasters.BillDate = vendorBillVM.BillDate;
                vendorBillMasters.InwardNo = vendorBillVM.InwardNo;
                vendorBillMasters.InwardDate = vendorBillVM.InwardDate;
                vendorBillMasters.BasicBillAmount = vendorBillVM.BasicBillAmount;
                vendorBillMasters.AdvanceAmountGiven = vendorBillVM.AdvanceAmountGiven;
                vendorBillMasters.Cgst = vendorBillVM.Cgst;
                vendorBillMasters.Sgst = vendorBillVM.Sgst;
                vendorBillMasters.Igst = vendorBillVM.Igst;
                vendorBillMasters.Ugst = vendorBillVM.Ugst;
                vendorBillMasters.Gsttotal = vendorBillVM.Gsttotal;
                vendorBillMasters.TotalBillAmount = vendorBillVM.TotalBillAmount;
                vendorBillMasters.Advance = vendorBillVM.Advance;
                vendorBillMasters.Balance = vendorBillVM.Balance;
                vendorBillMasters.Tds = vendorBillVM.Tds;
                vendorBillMasters.Section = vendorBillVM.Section;
                vendorBillMasters.Tdsamount = vendorBillVM.Tdsamount;
                vendorBillMasters.SecurityDeposite = vendorBillVM.SecurityDeposite;
                vendorBillMasters.OtherRecovery = vendorBillVM.OtherRecovery;
                vendorBillMasters.FinalPayableAmount = vendorBillVM.FinalPayableAmount;
                vendorBillMasters.DebitAccountNumberId = vendorBillVM.DebitAccountNumberId;
                vendorBillMasters.Tan = vendorBillVM.Tan;
                vendorBillMasters.Remark = vendorBillVM.Remark;
                vendorBillMasters.IsActive = vendorBillVM.IsActive;
                vendorBillMasters.UpdatedBy = 1;
                vendorBillMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(vendorBillMasters).State = EntityState.Modified;
            var entry = _context.ChangeTracker.Entries().FirstOrDefault();
            try
            {
                if (_context.SaveChanges() > 0)
                {
                    if (entry != null)
                    {
                        await CommonActivities.ActivityLog(new ActivityLogVM()
                        {
                            _context = _context,
                            UserId = 1,
                            TableName = entry.Entity.GetType().Name.ToString(),
                            TableId = vendorBillVM.Id,
                            Operation = EntityState.Modified.ToString(),
                            CollegeId = 1,
                            Ipaddress = null
                        });
                    }
                    return true;
                }
            }
            catch (DbUpdateConcurrencyException err)
            {
                Console.WriteLine(err.ToString());
            }
            return null;
        }
        #endregion Update

        #region Delete
        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool?> Delete(long id)
        {
            var vendorBillMasters = await _context.VendorBills.FindAsync(id);
            if (vendorBillMasters != null)
            {
                vendorBillMasters.IsDeleted = true;
                vendorBillMasters.UpdatedBy = 1;
                vendorBillMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(vendorBillMasters).State = EntityState.Modified;
                var entry = _context.ChangeTracker.Entries().FirstOrDefault();
                if (_context.SaveChanges() > 0)
                {
                    if (entry != null)
                    {
                        await CommonActivities.ActivityLog(new ActivityLogVM()
                        {
                            _context = _context,
                            UserId = 1,
                            TableName = entry.Entity.GetType().Name.ToString(),
                            TableId = id,
                            Operation = EntityState.Deleted.ToString(),
                            CollegeId = 1,
                            Ipaddress = null
                        });
                    }
                    return true;
                }
            }
            return null;
        }
        #endregion Delete
    }
}

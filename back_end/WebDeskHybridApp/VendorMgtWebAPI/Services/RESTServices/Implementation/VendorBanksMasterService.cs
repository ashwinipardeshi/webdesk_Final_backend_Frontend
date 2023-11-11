using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using VendorMgtWebAPI.Models;
using VendorMgtWebAPI.Services.RESTServices.Contract;
using VendorMgtWebAPI.ViewModels;

namespace VendorMgtWebAPI.Services.RESTServices.Implementation
{
    public class VendorBanksMasterService : IVendorBanksMasterService
    {
        private readonly VendorMgtDevFinalDbContext _context;

        public VendorBanksMasterService(VendorMgtDevFinalDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// GetAll
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<VendorBanksMasterVM?>> GetAll()
        {
            return await _context.VendorBanksMasters.Where(vb => vb.IsActive && vb.IsDeleted == false).Include(vb => vb.VendorMaster).OrderByDescending(vb => vb.Id).Select(vb => new VendorBanksMasterVM()
            {
                Id = vb.Id,
                VendorMasterId = vb.VendorMasterId,
                VendorName = vb.VendorMaster.Name,
                CollegeId = vb.CollegeId,
                CollegeName = "",
                Name = vb.Name,
                BranchName = vb.BranchName,
                AccountName = vb.AccountName,
                AccountType = vb.AccountType,
                AccountNo = vb.AccountNo,
                Ifsccode = vb.Ifsccode,
                IsActive = vb.IsActive,
                CreatedBy = vb.CreatedBy,
                CreatedDate = vb.CreatedDate,
                UpdatedBy = vb.UpdatedBy,
                UpdatedDate = vb.UpdatedDate
            }).ToListAsync<VendorBanksMasterVM?>();
        }

        ///// <summary>
        ///// Get
        ///// </summary>
        ///// <param name="id"></param>
        ///// <returns></returns>
        //public async Task<VendorBanksMasterVM?> Get(long id)
        //{
        //    return await _context.VendorBanksMasters.Where(vb => vb.Id == id && vb.IsActive && vb.IsDeleted == false).Include(vb => vb.VendorMaster).Select(vb => new VendorBanksMasterVM()
        //    {
        //        Id = vb.Id,
        //        VendorMasterId = vb.VendorMasterId,
        //        VendorName = vb.VendorMaster.Name,
        //        Name = vb.Name,
        //        BranchName = vb.BranchName,
        //        AccountName = vb.AccountName,
        //        AccountType = vb.AccountType,
        //        AccountNo = vb.AccountNo,
        //        Ifsccode = vb.Ifsccode,
        //        IsActive = vb.IsActive,
        //        CreatedBy = vb.CreatedBy,
        //        CreatedDate = vb.CreatedDate,
        //        UpdatedBy = vb.UpdatedBy,
        //        UpdatedDate = vb.UpdatedDate
        //    }).FirstOrDefaultAsync<VendorBanksMasterVM?>();
        //}

        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="vendorBanksMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(VendorBanksMasterVM vendorBanksMasterVM)
        {
            var recordExist = await _context.VendorBanksMasters.Where(vb => vb.Name == vendorBanksMasterVM.Name.Trim() && vb.IsActive && vb.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<VendorBanksMaster> created = await _context.VendorBanksMasters.AddAsync(new VendorBanksMaster()
            {
                VendorMasterId = vendorBanksMasterVM.VendorMasterId,
                CollegeId = vendorBanksMasterVM.CollegeId,
                Name = vendorBanksMasterVM.Name,
                BranchName = vendorBanksMasterVM.BranchName,
                AccountName = vendorBanksMasterVM.AccountName,
                AccountType = vendorBanksMasterVM.AccountType,
                AccountNo = vendorBanksMasterVM.AccountNo,
                Ifsccode = vendorBanksMasterVM.Ifsccode,
                IsActive = vendorBanksMasterVM.IsActive,
                IsDeleted = false,
                CreatedBy = 1,
                CreatedDate = DateTime.UtcNow,
            });

            var entry = _context.ChangeTracker.Entries().FirstOrDefault();
            if (_context.SaveChanges() > 0)
            {
                return created.Entity.Id;
            }
            return null;
        }

        /// <summary>
        /// Update
        /// </summary>
        /// <param name="vendorBanksMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(VendorBanksMasterVM vendorBanksMasterVM)
        {
            var vendorBanksMasters = await _context.VendorBanksMasters.FirstOrDefaultAsync(e => e.Id == vendorBanksMasterVM.Id);
            if (vendorBanksMasters != null)
            {
                vendorBanksMasters.VendorMasterId = vendorBanksMasterVM.VendorMasterId;
                vendorBanksMasters.CollegeId = vendorBanksMasterVM.CollegeId;
                vendorBanksMasters.Name = vendorBanksMasterVM.Name;
                vendorBanksMasters.BranchName = vendorBanksMasterVM.BranchName;
                vendorBanksMasters.AccountName = vendorBanksMasterVM.AccountName;
                vendorBanksMasters.AccountType = vendorBanksMasterVM.AccountType;
                vendorBanksMasters.AccountNo = vendorBanksMasterVM.AccountNo;
                vendorBanksMasters.Ifsccode = vendorBanksMasterVM.Ifsccode;
                vendorBanksMasters.IsActive = vendorBanksMasterVM.IsActive;
                vendorBanksMasters.UpdatedBy = 1;
                vendorBanksMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(vendorBanksMasters).State = EntityState.Modified;
            var entry = _context.ChangeTracker.Entries().FirstOrDefault();
            try
            {
                if (_context.SaveChanges() > 0)
                {
                    return true;
                }
            }
            catch (DbUpdateConcurrencyException err)
            {
                Console.WriteLine(err.ToString());
            }
            return null;
        }

        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool?> Delete(long id)
        {
            var vendorBanksMasters = await _context.VendorBanksMasters.FindAsync(id);
            if (vendorBanksMasters != null)
            {
                vendorBanksMasters.IsDeleted = true;
                vendorBanksMasters.UpdatedBy = 1;
                vendorBanksMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(vendorBanksMasters).State = EntityState.Modified;
                var entry = _context.ChangeTracker.Entries().FirstOrDefault();
                if (_context.SaveChanges() > 0)
                {
                    return true;
                }
            }
            return null;
        }
    }
}

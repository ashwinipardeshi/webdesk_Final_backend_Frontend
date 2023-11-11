

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
    public class VendorMasterServicer : IVendorMasterService
    {
        private readonly VendorMgtDevFinalDbContext _context;
        private readonly long userId = 0;
        private readonly long collegeId = 1;
        private readonly string? ipAddress = string.Empty;

        public VendorMasterServicer(VendorMgtDevFinalDbContext context)
        {
            _context = context;

        }
        #region GetAll
        /// <summary>
        /// GetAll
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<VendorMasterVM?>> GetAll()
        {
            var response = await _context.VendorMasters.Where(e => e.IsDeleted == false).OrderByDescending(e => e.Id).Select(e => new VendorMasterVM()
            {
                Id = e.Id,
                CollegeId = e.CollegeId,
                Name = e.Name,
                Address = e.Address,
                ContactNo = e.ContactNo,
                Gstno = e.Gstno,
                Pan = e.Pan,
                Tan = e.Tan,
                EmailId = e.EmailId,
                Website = e.Website,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).ToListAsync();

            return response;

        }
        #endregion GetAll

        #region Get
        /// <summary>
        /// Get
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<VendorMasterVM?> Get(long id)
        {

            var response = await _context.VendorMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new VendorMasterVM()
            {
                Id = e.Id,
                CollegeId = e.CollegeId,
                Name = e.Name,
                Address = e.Address,
                ContactNo = e.ContactNo,
                Gstno = e.Gstno,
                Pan = e.Pan,
                Tan = e.Tan,
                EmailId = e.EmailId,
                Website = e.Website,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync();

            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="vendorMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(VendorMasterVM vendorMasterVM)
        {
            EntityEntry<VendorMaster> created = await _context.VendorMasters.AddAsync(new VendorMaster()
            {
                Id = vendorMasterVM.Id,
                CollegeId = vendorMasterVM.CollegeId,
                Name = vendorMasterVM.Name,
                Address = vendorMasterVM.Address,
                ContactNo = vendorMasterVM.ContactNo,
                Gstno = vendorMasterVM.Gstno,
                Pan = vendorMasterVM.Pan,
                Tan = vendorMasterVM.Tan,
                EmailId = vendorMasterVM.EmailId,
                Website = vendorMasterVM.Website,
                IsActive = vendorMasterVM.IsActive,
                CreatedBy = vendorMasterVM.CreatedBy,
                CreatedDate = DateTime.UtcNow,
                UpdatedBy = vendorMasterVM.UpdatedBy,
                UpdatedDate = DateTime.UtcNow,
            });

            var entry = _context.ChangeTracker.Entries().FirstOrDefault();
            if (_context.SaveChanges() > 0)
            {

                long tableId = created.Entity.Id;
                await CommonActivities.ActivityLog(new ActivityLogVM()
                {
                    _context = _context,
                    UserId = userId,
                    TableName = entry.Entity.GetType().Name.ToString(),
                    TableId = tableId,
                    Operation = EntityState.Added.ToString(),
                    CollegeId = collegeId,
                    Ipaddress = ipAddress
                });
                return created.Entity.Id;

            }
            return null;
        }
        #endregion Insert

        #region Update
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="vendorMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(VendorMasterVM vendorMasterVM)
        {
            var vendorMasters = await _context.VendorMasters.FirstOrDefaultAsync(e => e.Id == vendorMasterVM.Id);
            if (vendorMasters != null)
            {
                vendorMasters.CollegeId = vendorMasterVM.CollegeId;
                vendorMasters.Name = vendorMasterVM.Name;
                vendorMasters.Address = vendorMasterVM.Address;
                vendorMasters.ContactNo = vendorMasterVM.ContactNo;
                vendorMasters.Gstno = vendorMasterVM.Gstno;
                vendorMasters.Pan = vendorMasterVM.Pan;
                vendorMasters.Tan = vendorMasterVM.Tan;
                vendorMasters.EmailId = vendorMasterVM.EmailId;
                vendorMasters.Website = vendorMasterVM.Website;
                vendorMasters.IsActive = vendorMasterVM.IsActive;
                vendorMasters.UpdatedBy = 1;
                vendorMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(vendorMasters).State = EntityState.Modified;
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
        #endregion Update

        #region Delete
        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool?> Delete(long id)
        {
            var vendorMasters = await _context.VendorMasters.FindAsync(id);
            if (vendorMasters != null)
            {
                vendorMasters.IsDeleted = true;
                vendorMasters.UpdatedBy = 1;
                vendorMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(vendorMasters).State = EntityState.Modified;
                var entry = _context.ChangeTracker.Entries().FirstOrDefault();
                if (_context.SaveChanges() > 0)
                {
                    return true;
                }
            }
            return null;
        }
        #endregion Delete
    }

}

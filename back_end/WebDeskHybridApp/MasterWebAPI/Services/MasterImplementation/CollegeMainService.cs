using MasterWebAPI.Data;
using MasterWebAPI.Models;
using MasterWebAPI.ViewModels.Masters;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using MasterWebAPI.Services.MasterContract;

namespace MasterWebAPI.Services.MasterImplementation
{
    public class CollegeMainService: ICollegeMainService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly long userId;
        public CollegeMainService(MasterDevFinalDbContext context)
        {
            _context = context;          
        }

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="collegeMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(CollegeMasterVM collegeMainMasterVM)
        {
            //var recordExist = await _context.CollegeMasters.Where(re => re.Name == collegeMainMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            //if (recordExist != null)
            //    return 0;
            EntityEntry<CollegeMaster> created = await _context.CollegeMasters.AddAsync(new CollegeMaster()
            {
                Name = collegeMainMasterVM.Name.Trim(),
                ShortName = collegeMainMasterVM.ShortName,
                Description = collegeMainMasterVM.Description,
                University = collegeMainMasterVM.University,
                Category = collegeMainMasterVM.Category,
                Address = collegeMainMasterVM.Address,
                Website = collegeMainMasterVM.Website,
                Email = collegeMainMasterVM.Email,
                PhoneNo = collegeMainMasterVM.PhoneNo,
                Cpname = collegeMainMasterVM.Cpname,
                Cpemail = collegeMainMasterVM.Cpemail,
                Cpmob = collegeMainMasterVM.PhoneNo,
                Type = collegeMainMasterVM.Type,
                IsActive = collegeMainMasterVM.IsActive,
                IsDeleted = false,
                CreatedBy = userId,
                CreatedDate = DateTime.UtcNow,
            });
            var entry = _context.ChangeTracker.Entries().FirstOrDefault();
            if (_context.SaveChanges() > 0)
            {
                return created.Entity.Id;
            }
            return null;
        }
        #endregion Insert

    }
}

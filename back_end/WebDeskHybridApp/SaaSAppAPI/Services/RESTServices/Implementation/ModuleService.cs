using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using SaaSAppAPI.Data;
using SaaSAppAPI.Models;
using SaaSAppAPI.ViewModels;
using SaaSAppAPI.ViewModels.Common;
using SaaSAppAPI.Utility;
using SaaSAppAPI.Services.RESTServices.Contract;

namespace SaaSAppAPI.Services.RESTServices.Implementation
{
    public class ModuleService : IModuleService
    {
        private readonly SaaSdevDbFinalContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId = 0;
        private readonly long collegeId = 1;
        private readonly string? ipAddress = string.Empty;
        private readonly long academicYearId = 6;
        public ModuleService(SaaSdevDbFinalContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            //userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("Id"))?.Value);
            //collegeId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("CollegeId"))?.Value);
            //ipAddress = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("IPAddress"))?.Value.ToString();
        }

        #region GetAll
        /// <summary>
        /// GetAll
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<ModuleMasterGraphVM?>> GetAll()
        {
            return await _context.ModuleMasters.Where(e => e.IsDeleted == false).Select(e => new ModuleMasterGraphVM()
            {
                Id = e.Id,
                Name = e.Name,
                Description = e.Description,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).ToListAsync();
        }
        #endregion GetAll

        #region Get
        /// <summary>
        /// GetSpecific
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ModuleMasterGraphVM?> Get(long id)
        {
            return await _context.ModuleMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new ModuleMasterGraphVM()
            {
                Id = e.Id,
                Name = e.Name,
                Description = e.Description,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync();
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="ModuleMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(ModuleMasterGraphVM moduleMasterVM)
        {
            var recordExist = await _context.ModuleMasters.Where(re => re.Name == moduleMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return null;
            EntityEntry<ModuleMaster> created = await _context.ModuleMasters.AddAsync(new ModuleMaster()
            {
                Name = moduleMasterVM.Name.Trim(),
                Description = moduleMasterVM.Description,
                IsActive = moduleMasterVM.IsActive,
                IsDeleted = false,
                CreatedBy = userId,
                CreatedDate = DateTime.UtcNow,
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
                        UserId = userId,
                        TableName = entry.Entity.GetType().Name.ToString(),
                        TableId = tableId,
                        Operation = EntityState.Added.ToString(),
                        CollegeId = collegeId,
                        Ipaddress = ipAddress
                    });
                    return created.Entity.Id;
                }
            }
            return null;
        }
        #endregion Insert

        #region Update
        /// <summary>
        /// Update
        /// </summary>
        /// <param name="moduleMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(ModuleMasterGraphVM moduleMasterVM)
        {
            var moduleMasters = await _context.ModuleMasters.FirstOrDefaultAsync(e => e.Id == moduleMasterVM.Id);
            if (moduleMasters != null)
            {
                moduleMasters.Name = moduleMasterVM.Name;
                moduleMasters.Description = moduleMasterVM.Description;
                moduleMasters.IsActive = moduleMasterVM.IsActive;
                moduleMasters.UpdatedBy = userId;
                moduleMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(moduleMasters).State = EntityState.Modified;
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
                            UserId = userId,
                            TableName = entry.Entity.GetType().Name.ToString(),
                            TableId = moduleMasterVM.Id,
                            Operation = EntityState.Modified.ToString(),
                            CollegeId = collegeId,
                            Ipaddress = ipAddress
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
            var moduleMasters = await _context.ModuleMasters.FindAsync(id);
            if (moduleMasters != null)
            {
                moduleMasters.IsDeleted = true;
                moduleMasters.UpdatedBy = userId;
                moduleMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(moduleMasters).State = EntityState.Modified;
                var entry = _context.ChangeTracker.Entries().FirstOrDefault();
                if (_context.SaveChanges() > 0)
                {
                    if (entry != null)
                    {
                        await CommonActivities.ActivityLog(new ActivityLogVM()
                        {
                            _context = _context,
                            UserId = userId,
                            TableName = entry.Entity.GetType().Name.ToString(),
                            TableId = id,
                            Operation = EntityState.Deleted.ToString(),
                            CollegeId = collegeId,
                            Ipaddress = ipAddress
                        });
                    }
                    //  return true;
                }
            }
            return null;
        }
        #endregion Delete

        #region GetOptions
        /// <summary>
        /// GetOptions
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<OptionVM?>> GetOptions()
        {
            return await _context.ModuleMasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
            {
                Id = e.Id,
                Name = e.Name
            }).ToListAsync();
        }
        #endregion GetOptions

    }
}

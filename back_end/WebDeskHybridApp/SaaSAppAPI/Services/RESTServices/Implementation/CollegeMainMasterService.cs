using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Newtonsoft.Json;
using SaaSAppAPI.Data;
using SaaSAppAPI.Models;
using SaaSAppAPI.Services.HTTPServices;
using SaaSAppAPI.Services.RESTServices.Contract;
using SaaSAppAPI.Utility;
using SaaSAppAPI.ViewModels;
using SaaSAppAPI.ViewModels.Common;
using System.Text;

namespace SaaSAppAPI.Services.RESTServices.Implementation
{
    public class CollegeMainMasterService : ICollegeMainMasterService
    {
        private readonly SaaSdevDbFinalContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHTTPRequestService _httpRequestService;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly long academicYearId;
        public CollegeMainMasterService(SaaSdevDbFinalContext context, IHttpContextAccessor httpContextAccessor, IHTTPRequestService httpRequestService)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _httpRequestService= httpRequestService;
            string uId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("UserId"))?.Value;
            string cId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("CollegeId"))?.Value;
            string ayId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("AcademicYearId"))?.Value;

            long.TryParse(uId, out userId);
            long.TryParse(cId, out collegeId);
            long.TryParse(ayId, out academicYearId);
        }
        public async Task<IEnumerable<CollegeMainMasterVM>> GetAll()
        {
            return await _context.CollegeMainMasters.Where(c => c.IsDeleted == false).Select(c => new CollegeMainMasterVM()
            {
                Id = c.Id,
                CollegeMasterId = c.CollegeMasterId,
                Name = c.Name,
                ShortName = c.ShortName,
                Description = c.Description,
                University = c.University,
                Category = c.Category,
                Address = c.Address,
                Website = c.Website,
                Email = c.Email,
                PhoneNo = c.PhoneNo,
                Cpname = c.Cpname,
                Cpmob = c.Cpmob,
                Cpemail = c.Cpemail,
                Type = c.Type,
                IsActive = c.IsActive,
                CreatedBy = c.CreatedBy,
                CreatedDate = c.CreatedDate,
                UpdatedBy = c.UpdatedBy,
                UpdatedDate = c.UpdatedDate
            }).ToListAsync();
        }

        #region Get
        /// <summary>
        /// GetSpecific
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<CollegeMainMasterVM?> Get(long id)
        {
            return await _context.CollegeMainMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new CollegeMainMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                ShortName = e.ShortName,
                Description = e.Description,
                University = e.University,
                Category = e.Category,
                Address = e.Address,
                Website = e.Website,
                Email = e.Email,
                PhoneNo = e.PhoneNo,
                Cpname = e.Cpname,
                Cpmob = e.Cpmob,
                Cpemail = e.Cpemail,
                Type = e.Type,
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
        /// <param name="collegeMainMasterVM"></param>
        /// <returns></returns>
      

        public async Task<long?> Insert(CommonMainCollegeMasterVM commonMainCollegeMasterVM)
        {
            long id = 0;
            var recordExist = await _context.CollegeMainMasters.Where(re => re.Name == commonMainCollegeMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return null;
            EntityEntry<CollegeMainMaster> created = await _context.CollegeMainMasters.AddAsync(new CollegeMainMaster()
            {
                Name = commonMainCollegeMasterVM.Name.Trim(),
                CollegeMasterId = commonMainCollegeMasterVM.CollegeMasterId,
                ShortName = commonMainCollegeMasterVM.ShortName,
                Description = commonMainCollegeMasterVM.Description,
                University = commonMainCollegeMasterVM.University,
                Category = commonMainCollegeMasterVM.Category,
                Address = commonMainCollegeMasterVM.Address,
                Website = commonMainCollegeMasterVM.Website,
                PhoneNo = commonMainCollegeMasterVM.PhoneNo,
                Email = commonMainCollegeMasterVM.Email,
                Cpname = commonMainCollegeMasterVM.Cpname,
                Cpmob = commonMainCollegeMasterVM.Cpmob,
                Cpemail = commonMainCollegeMasterVM.Cpemail,
                Type = commonMainCollegeMasterVM.Type,
                IsActive = commonMainCollegeMasterVM.IsActive,
                IsDeleted = false,
                CreatedBy = userId,
                CreatedDate = DateTime.UtcNow,
            });
            if (_context.SaveChanges() > 0)
            {
                //    DateTime currentDate = DateTime.Now;
                //    int numberOfDaysToAdd = 7;
                //    DateTime futureDate = currentDate.AddDays(numberOfDaysToAdd);
                id = created.Entity.Id;

                // HTTP Call to College Master
                string baseurl = StaticConfigurationManager.AppSetting["Ports:MasterURL"];

                long? collegeMasterId = await _httpRequestService.HTTPPostRequestCall($"{baseurl}/CollegeMainMaster/Insert", commonMainCollegeMasterVM);
                if (collegeMasterId.HasValue)
                {
                    // Update collgeMasterId of Master into CollegeMainMaster
                    var collegeMainMaster = await _context.CollegeMainMasters.FindAsync(id);
                    collegeMainMaster.CollegeMasterId = collegeMasterId.Value;
                    _context.Entry(collegeMainMaster).State = EntityState.Modified;
                    _context.SaveChanges();
                    return id;
                }

                var collegeSubscription = new CollegeSubscription()
                {
                    CollegeId = id,
                    SubscriptionMasterId = commonMainCollegeMasterVM.CollegeSubscriptionVMSubscriptionMasterId,
                    FromDate = commonMainCollegeMasterVM.CollegeSubscriptionVMFromDate,
                    ToDate = commonMainCollegeMasterVM.CollegeSubscriptionVMToDate,
                    //FromDate = currentDate,
                    //ToDate = currentDate.AddDays(30),
                    IsActive = commonMainCollegeMasterVM.CollegeSubscriptionVMIsActive,
                    IsDeleted = false,
                    CreatedBy = userId,
                    CreatedDate = DateTime.UtcNow
                };
                await _context.CollegeSubscriptions.AddAsync(collegeSubscription);
                if (_context.SaveChanges() > 0)
                {
                    long collegeSubscriptionId = collegeSubscription.Id;
                    IList<CollegeModule> collegeModulesAddList = new List<CollegeModule>();
                    if (commonMainCollegeMasterVM.collegeModuleVMList?.Count > 0)
                    {
                        foreach (var collegeModulesVM in commonMainCollegeMasterVM.collegeModuleVMList)
                        {
                            if (collegeModulesVM.Id == 0) // Add
                            {
                                collegeModulesAddList.Add(new CollegeModule
                                {
                                    CollegeId = id,
                                    CollegeSubscriptionId = collegeSubscriptionId,
                                    ModuleMasterId = collegeModulesVM.ModuleMasterId,
                                    IsActive = collegeModulesVM.IsActive,
                                    IsDeleted = false,
                                    CreatedBy = userId,
                                    CreatedDate = DateTime.UtcNow,
                                });
                            }
                        }
                    }                 
                    await _context.CollegeModules.AddRangeAsync(collegeModulesAddList);
                }
            }
            
            if (await _context.SaveChangesAsync() > 0)
            {               
                return 0;
            }

            return null;
        }
        #endregion Insert

        #region Update
        /// <summary>
        /// Update
        /// </summary>
        /// <param name="collegeMainMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(CollegeMainMasterVM collegeMainMasterVM)
        {
            var collegeMainMasters = await _context.CollegeMainMasters.FirstOrDefaultAsync(e => e.Id == collegeMainMasterVM.Id);
            if (collegeMainMasters != null)
            {
                collegeMainMasters.Name = collegeMainMasterVM.Name.Trim();
                collegeMainMasters.ShortName = collegeMainMasterVM.ShortName;
                collegeMainMasters.Description = collegeMainMasterVM.Description;
                collegeMainMasters.University = collegeMainMasterVM.University;
                collegeMainMasters.Category = collegeMainMasterVM.Category;
                collegeMainMasters.Address = collegeMainMasterVM.Address;
                collegeMainMasters.Website = collegeMainMasterVM.Website;
                collegeMainMasters.PhoneNo = collegeMainMasterVM.PhoneNo;
                collegeMainMasters.Email = collegeMainMasterVM.Email;
                collegeMainMasters.Cpname = collegeMainMasterVM.Cpname;
                collegeMainMasters.Cpmob = collegeMainMasterVM.Cpmob;
                collegeMainMasters.Cpemail = collegeMainMasterVM.Cpemail;
                collegeMainMasters.Type = collegeMainMasterVM.Type;
                collegeMainMasters.IsActive = collegeMainMasterVM.IsActive;
                collegeMainMasters.UpdatedBy = userId;
                collegeMainMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(collegeMainMasters).State = EntityState.Modified;
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
                            TableId = collegeMainMasterVM.Id,
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
            var collegeMainMasters = await _context.CollegeMainMasters.FindAsync(id);
            if (collegeMainMasters != null)
            {
                collegeMainMasters.IsDeleted = true;
                collegeMainMasters.UpdatedBy = userId;
                collegeMainMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(collegeMainMasters).State = EntityState.Modified;
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
    }
}

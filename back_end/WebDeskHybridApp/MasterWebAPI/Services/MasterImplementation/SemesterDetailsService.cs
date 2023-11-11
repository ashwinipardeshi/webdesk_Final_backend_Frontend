using MasterWebAPI.Data;
using MasterWebAPI.Models;
using MasterWebAPI.RedisServices;
using MasterWebAPI.Services.MasterContract;
using MasterWebAPI.Utility;
using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace MasterWebAPI.Services.MasterImplementation
{
    public class SemesterDetailsService : ISemesterDetailsService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllSemesterDetailsMaster";
        private readonly string getOptionsCacheKey = "GetOptionsSemesterDetailsMaster";
        public SemesterDetailsService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _redisService = redisService;

            string uId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("UserId"))?.Value.ToString();
            string cId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("CollegeId"))?.Value.ToString();
            ipAddress = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("IPAddress"))?.Value.ToString();
            long.TryParse(uId, out userId);
            long.TryParse(cId, out collegeId);
        }

        #region GetAll
        /// <summary>
        /// GetAll
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<SemesterDetailsMasterVM?>> GetAll(long programMasterId, long programYearId, long academicYearId)
        {
            string cacheKey = $"SemesterDetailsMasters_CollegeId_{collegeId}";
            var response = new List<SemesterDetailsMasterVM>();
            response = await _redisService.GetRedisCacheData<List<SemesterDetailsMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.SemesterDetailsMasters.Where(p => p.ProgramMasterId == programMasterId && p.ProgramYearId == programYearId && p.AcademicYearId == academicYearId && p.IsDeleted == false).Include(p => p.SemesterMaster).Include(p => p.ProgramMaster).Include(p => p.ProgramYear).Include(p => p.AcademicYear).OrderByDescending(e => e.Id).Select(p => new SemesterDetailsMasterVM()
            {
                Id = p.Id,
                SemesterMasterId = p.SemesterMasterId,
                ProgramMasterId = p.ProgramMasterId,
                ProgramYearId = p.ProgramYearId,
                AcademicYearId = p.AcademicYearId,                
                SemesterMasterName =p.SemesterMaster.Name,
                ProgramMasterName = p.ProgramMaster.Name,
                ProgramYearName = p.ProgramYear.Name,
                AcademicYearName = p.AcademicYear.Name,
                Year = p.Year,
                StartDate = p.StartDate,
                EndDate = p.EndDate,
                IsActive = p.IsActive,
                CreatedBy = p.CreatedBy,
                CreatedDate = p.CreatedDate,
                UpdatedBy = p.UpdatedBy,
                UpdatedDate = p.UpdatedDate
            }).ToListAsync<SemesterDetailsMasterVM>();
                await _redisService.SetRedisCacheData<List<SemesterDetailsMasterVM>>(getAllCacheKey, response);
            }
            return response;
        }
        #endregion GetAll

        #region Get
        /// <summary>
        /// Get
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<SemesterDetailsMasterVM?> Get(long id)
        {
            var response = new SemesterDetailsMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<SemesterDetailsMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<SemesterDetailsMasterVM>();
            else
            {
                response =await _context.SemesterDetailsMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new SemesterDetailsMasterVM()
            {
                Id = e.Id,
                SemesterMasterId=e.SemesterMasterId,
                ProgramMasterId=e.ProgramMasterId,
                ProgramYearId=e.ProgramYearId,
                AcademicYearId=e.AcademicYearId,               
                Year = e.Year,
                StartDate = e.StartDate,
                EndDate = e.EndDate,
                SemesterMasterName =e.SemesterMaster.Name,
                ProgramMasterName = e.ProgramMaster.Name,
                ProgramYearName = e.ProgramYear.Name,
                AcademicYearName = e.AcademicYear.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<SemesterDetailsMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="semesterDetailsMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(SemesterDetailsMasterVM semesterDetailsMasterVM)
        {
            EntityEntry<SemesterDetailsMaster> created = await _context.SemesterDetailsMasters.AddAsync(new SemesterDetailsMaster()
            {               
                ProgramMasterId = semesterDetailsMasterVM.ProgramMasterId,
                ProgramYearId = semesterDetailsMasterVM.ProgramYearId,
                SemesterMasterId = semesterDetailsMasterVM.SemesterMasterId,
                AcademicYearId = semesterDetailsMasterVM.AcademicYearId,
                Year = semesterDetailsMasterVM.Year,
                StartDate = semesterDetailsMasterVM.StartDate,
                EndDate = semesterDetailsMasterVM.EndDate,
                IsActive = semesterDetailsMasterVM.IsActive,
                IsDeleted = false,
                CreatedBy = userId,
                CreatedDate = DateTime.UtcNow
            });
            var entry = _context.ChangeTracker.Entries().FirstOrDefault();
            if (_context.SaveChanges() > 0)
            {
                await _redisService.RemoveRedisCacheData(getAllCacheKey);
                await _redisService.RemoveRedisCacheData(getOptionsCacheKey);
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
        /// <param name="semesterDetailsMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(SemesterDetailsMasterVM semesterDetailsMasterVM)
        {
            var semesterDetailMasters = await _context.SemesterDetailsMasters.FirstOrDefaultAsync(e => e.Id == semesterDetailsMasterVM.Id);
            if (semesterDetailMasters != null)
            {                
                semesterDetailMasters.IsActive = semesterDetailsMasterVM.IsActive;
                semesterDetailMasters.SemesterMasterId = semesterDetailsMasterVM.SemesterMasterId;
                semesterDetailMasters.ProgramMasterId = semesterDetailsMasterVM.ProgramMasterId;
                semesterDetailMasters.ProgramYearId = semesterDetailsMasterVM.ProgramYearId;
                semesterDetailMasters.AcademicYearId = semesterDetailsMasterVM.AcademicYearId;
                semesterDetailMasters.Year = semesterDetailsMasterVM.Year;
                semesterDetailMasters.StartDate = semesterDetailsMasterVM.StartDate;
                semesterDetailMasters.EndDate = semesterDetailsMasterVM.EndDate;
                semesterDetailMasters.UpdatedBy = userId;
                semesterDetailMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(semesterDetailMasters).State = EntityState.Modified;
            var entry = _context.ChangeTracker.Entries().FirstOrDefault();
            try
            {
                if (_context.SaveChanges() > 0)
                {
                    await _redisService.RemoveRedisCacheData(getAllCacheKey);
                    await _redisService.RemoveRedisCacheData(getOptionsCacheKey);
                    if (entry != null)
                    {
                        await CommonActivities.ActivityLog(new ActivityLogVM()
                        {
                            _context = _context,
                            UserId = userId,
                            TableName = entry.Entity.GetType().Name.ToString(),
                            TableId = semesterDetailsMasterVM.Id,
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
            var semesterDetailMasters = await _context.SemesterDetailsMasters.FindAsync(id);
            if (semesterDetailMasters != null)
            {
                semesterDetailMasters.IsDeleted = true;
                semesterDetailMasters.UpdatedBy = userId;
                semesterDetailMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(semesterDetailMasters).State = EntityState.Modified;
                var entry = _context.ChangeTracker.Entries().FirstOrDefault();
                if (_context.SaveChanges() > 0)
                {
                    await _redisService.RemoveRedisCacheData(getAllCacheKey);
                    await _redisService.RemoveRedisCacheData(getOptionsCacheKey);
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
                    return true;
                }
            }
            return null;
        }
        #endregion Delete
    }
}


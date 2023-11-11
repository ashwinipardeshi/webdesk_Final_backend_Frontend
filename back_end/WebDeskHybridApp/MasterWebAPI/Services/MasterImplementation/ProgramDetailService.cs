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
    public class ProgramDetailService : IProgramDetailService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllProgramDetailMaster";
        private readonly string getOptionsCacheKey = "GetOptionsProgramDetailMaster";
        public ProgramDetailService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<ProgramDetailMasterVM?>> GetAll()
        {
            var response = new List<ProgramDetailMasterVM>();
            response = await _redisService.GetRedisCacheData<List<ProgramDetailMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.ProgramDetailMasters.Where(p => p.IsDeleted == false).Include(p => p.ProgramType).Include(p => p.ProgramMaster).Include(p => p.SyllabusPatternMaster).OrderByDescending(e => e.Id).Select(p => new ProgramDetailMasterVM()
            {
                Id = p.Id,
                ProgramTypeId = p.ProgramTypeId,
                ProgramMasterId = p.ProgramMasterId,
                SyllabusPatternMasterId = p.SyllabusPatternMasterId,               
                ProgramTypeName = p.ProgramType.Name,
                ProgramMasterName = p.ProgramMaster.Name,
                SyllabusPatternMasterName =p.SyllabusPatternMaster.Name,
                NoOfSem = p.NoOfSem,
                Duration = p.Duration,
                MaxCredit = p.MaxCredit,
                MinCredit = p.MinCredit,
                IsActive = p.IsActive,
                CreatedBy = p.CreatedBy,
                CreatedDate = p.CreatedDate,
                UpdatedBy = p.UpdatedBy,
                UpdatedDate = p.UpdatedDate
            }).ToListAsync<ProgramDetailMasterVM>();
                // Store into Redis Cache
                await _redisService.SetRedisCacheData<List<ProgramDetailMasterVM>>(getAllCacheKey, response);
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
        public async Task<ProgramDetailMasterVM?> Get(long id)
        {
            var response = new ProgramDetailMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<ProgramDetailMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<ProgramDetailMasterVM>();
            else
            {
                response = await _context.ProgramDetailMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new ProgramDetailMasterVM()
            {
                Id = e.Id,
                ProgramTypeId= e.ProgramTypeId,
                ProgramMasterId= e.ProgramMasterId,
                SyllabusPatternMasterId= e.SyllabusPatternMasterId,                
                NoOfSem = e.NoOfSem,
                Duration = e.Duration,
                MaxCredit = e.MaxCredit,
                MinCredit = e.MinCredit,
                ProgramTypeName = e.ProgramType.Name,
                ProgramMasterName = e.ProgramMaster.Name,
                SyllabusPatternMasterName = e.SyllabusPatternMaster.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<ProgramDetailMasterVM>();
        }
        return response;
    }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="programDetailMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(ProgramDetailMasterVM programDetailMasterVM)
        {
            EntityEntry<ProgramDetailMaster> created = await _context.ProgramDetailMasters.AddAsync(new ProgramDetailMaster()
            {               
                ProgramTypeId = programDetailMasterVM.ProgramTypeId,
                ProgramMasterId = programDetailMasterVM.ProgramMasterId,
                SyllabusPatternMasterId = programDetailMasterVM.SyllabusPatternMasterId,
                NoOfSem = programDetailMasterVM.NoOfSem,
                Duration = programDetailMasterVM.Duration,
                MaxCredit = programDetailMasterVM.MaxCredit,
                MinCredit = programDetailMasterVM.MinCredit,
                IsActive = programDetailMasterVM.IsActive,
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
        /// <param name="programDetailMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(ProgramDetailMasterVM programDetailMasterVM)
        {
            var programDetailMasters = await _context.ProgramDetailMasters.FirstOrDefaultAsync(e => e.Id == programDetailMasterVM.Id);
            if (programDetailMasters != null)
            {            
                programDetailMasters.IsActive = programDetailMasterVM.IsActive;
                programDetailMasters.ProgramTypeId = programDetailMasterVM.ProgramTypeId;
                programDetailMasters.ProgramMasterId = programDetailMasterVM.ProgramMasterId;
                programDetailMasters.SyllabusPatternMasterId = programDetailMasterVM.SyllabusPatternMasterId;
                programDetailMasters.NoOfSem = programDetailMasterVM.NoOfSem;
                programDetailMasters.Duration = programDetailMasterVM.Duration;
                programDetailMasters.MinCredit = programDetailMasterVM.MinCredit;
                programDetailMasters.MaxCredit = programDetailMasterVM.MaxCredit;
                programDetailMasters.UpdatedBy = userId;
                programDetailMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(programDetailMasters).State = EntityState.Modified;
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
                            TableId = programDetailMasterVM.Id,
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
            var programDetailMasters = await _context.ProgramDetailMasters.FindAsync(id);
            if (programDetailMasters != null)
            {
                programDetailMasters.IsDeleted = true;
                programDetailMasters.UpdatedBy = userId;
                programDetailMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(programDetailMasters).State = EntityState.Modified;
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



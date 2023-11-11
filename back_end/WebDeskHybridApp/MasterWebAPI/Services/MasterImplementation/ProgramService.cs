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
    public class ProgramService : IProgramService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllProgramMaster";
        private readonly string getOptionsCacheKey = "GetOptionsProgramMaster";
        public ProgramService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<ProgramMasterVM?>> GetAll(long collegeId, long streamId)
        {
            string cacheKey = $"ProgramMasters_CollegeId_{collegeId}_ProgramMasters_StreamId_{streamId}";
            var response = new List<ProgramMasterVM>();
            response = await _redisService.GetRedisCacheData<List<ProgramMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.ProgramMasters.Where(p => p.CollegeId == collegeId && p.StreamId == streamId && p.IsDeleted == false).Include(p => p.College).Include(p => p.ProgramType).Include(p => p.Stream).OrderByDescending(e => e.Id).Select(p => new ProgramMasterVM()
            {
                Id = p.Id,
                CollegeId = p.CollegeId,
                CollegeName = p.College.Name,
                ProgramTypeId = p.ProgramTypeId,
                ProgramTypeName = p.ProgramType.Name,
                StreamId = p.StreamId,
                StreamName = p.Stream.Name,
                Name = p.Name,
                ShortName = p.ShortName,
                Description = p.Description,
                IsActive = p.IsActive,
                CreatedBy = p.CreatedBy,
                CreatedDate = p.CreatedDate,
                UpdatedBy = p.UpdatedBy,
                UpdatedDate = p.UpdatedDate
            }).ToListAsync<ProgramMasterVM>();
                // Store into Redis Cache
                await _redisService.SetRedisCacheData<List<ProgramMasterVM>>(getAllCacheKey, response);
            }
            return response;
        }
        #endregion GetAll

        #region Get
        /// <summary>
        /// GetSpecific
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ProgramMasterVM?> Get(long id)
        {
            var response = new ProgramMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<ProgramMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<ProgramMasterVM>();
            else
            {
                response = await _context.ProgramMasters.Where(p => p.Id == id && p.IsDeleted == false).Include(p => p.College).Include(p => p.ProgramType).Include(p => p.Stream).Select(p => new ProgramMasterVM()
            {
                Id = p.Id,
                CollegeId = p.CollegeId,
                CollegeName = p.College.Name,
                ProgramTypeId = p.ProgramTypeId,
                ProgramTypeName = p.ProgramType.Name,
                StreamId = p.StreamId,
                StreamName = p.Stream.Name,
                Name = p.Name,
                ShortName = p.ShortName,
                Description = p.Description,
                IsActive = p.IsActive,
                CreatedBy = p.CreatedBy,
                CreatedDate = p.CreatedDate,
                UpdatedBy = p.UpdatedBy,
                UpdatedDate = p.UpdatedDate
            }).FirstOrDefaultAsync<ProgramMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="programMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(ProgramMasterVM programMasterVM)
        {
            var recordExist = await _context.ProgramMasters.Where(re => re.Name == programMasterVM.Name.Trim() && re.CollegeId == programMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return null;
            EntityEntry<ProgramMaster> created = await _context.ProgramMasters.AddAsync(new ProgramMaster()
            {
                CollegeId = programMasterVM.CollegeId,
                ProgramTypeId = programMasterVM.ProgramTypeId,
                StreamId = programMasterVM.StreamId,
                Name = programMasterVM.Name.Trim(),
                ShortName = programMasterVM.ShortName,
                Description = programMasterVM.Description,
                IsActive = programMasterVM.IsActive,
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
        /// </summary>
        /// <param name="id"></param>
        /// <param name="programMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(ProgramMasterVM programMasterVM)
        {
            var program = await _context.ProgramMasters.FirstOrDefaultAsync(p => p.Id == programMasterVM.Id);
            if (program != null)
            {
                program.CollegeId = programMasterVM.CollegeId;
                program.ProgramTypeId = programMasterVM.ProgramTypeId;
                program.StreamId = programMasterVM.StreamId;
                program.Name = programMasterVM.Name;
                program.ShortName = programMasterVM.ShortName;
                program.Description = programMasterVM.Description;
                program.IsActive = programMasterVM.IsActive;
                program.UpdatedBy = userId;
                program.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(program).State = EntityState.Modified;
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
                            TableId = programMasterVM.Id,
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
            var program = await _context.ProgramMasters.FindAsync(id);
            if (program != null)
            {
                program.IsDeleted = true;
                program.UpdatedBy = userId;
                program.UpdatedDate = DateTime.UtcNow;
                _context.Entry(program).State = EntityState.Modified;
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

        #region GetOptions
        /// <summary>
        /// GetOptions
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<OptionVM?>> GetOptions(long collegeId, long streamId)
        {
            var response = new List<OptionVM>();
            response = await _redisService.GetRedisCacheData<List<OptionVM>>(getOptionsCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.ProgramMasters.Where(p => p.CollegeId == collegeId && p.StreamId == streamId && p.IsActive && p.IsDeleted == false).OrderBy(e => e.Name).Select(p => new OptionVM()
            {
                Id = p.Id,
                Name = p.Name
            }).ToListAsync<OptionVM>();
                await _redisService.SetRedisCacheData<List<OptionVM>>(getOptionsCacheKey, response);
            }
            return response;
        }
        #endregion GetOptions
    }
}


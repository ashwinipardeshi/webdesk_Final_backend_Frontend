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
    public class BankService : IBankService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllBankMaster";
        private readonly string getOptionsCacheKey = "GetOptionsBankMaster";
        public BankService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<BankMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"BankMasters_CollegeId_{collegeId}";
            var response = new List<BankMasterVM>();
            response = await _redisService.GetRedisCacheData<List<BankMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.BankMasters.Where(e => e.CollegeId == collegeId && e.IsDeleted == false).Include(e=>e.College).OrderByDescending(e => e.Id).Select(e => new BankMasterVM()
            {
                Id = e.Id,
                CollegeId = e.CollegeId,
                CollegeName=e.College.Name,
                Name = e.Name,
                Actype = e.Actype,
                Acnumber = e.Acnumber,
                AcholderName = e.AcholderName,
                BranchName = e.BranchName,
                BranchAddress = e.BranchAddress,
                Ifsc = e.Ifsc,
                Micr = e.Micr,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).ToListAsync<BankMasterVM>();
                // Store into Redis Cache
                await _redisService.SetRedisCacheData<List<BankMasterVM>>(getAllCacheKey, response);
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
        public async Task<BankMasterVM?> Get(long id)
        {
            var response = new BankMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<BankMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<BankMasterVM>();
            else
            {
                response =  await _context.BankMasters.Where(e => e.Id == id && e.IsDeleted == false).Include(e => e.College).Select(e => new BankMasterVM()
            {
                Id = e.Id,
                CollegeId = e.CollegeId,
                CollegeName = e.College.Name,
                Name = e.Name,
                Actype = e.Actype,
                Acnumber = e.Acnumber,
                AcholderName = e.AcholderName,
                BranchName = e.BranchName,
                BranchAddress = e.BranchAddress,
                Ifsc = e.Ifsc,
                Micr = e.Micr,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<BankMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="bankMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(BankMasterVM bankMasterVM)
        {
            var recordExist = await _context.BankMasters.Where(re => re.Name == bankMasterVM.Name.Trim() && re.CollegeId == bankMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<BankMaster> created = await _context.BankMasters.AddAsync(new BankMaster()
            {
                CollegeId = bankMasterVM.CollegeId,
                Name = bankMasterVM.Name.Trim(),
                Actype = bankMasterVM.Actype,
                Acnumber = bankMasterVM.Acnumber,
                AcholderName = bankMasterVM.AcholderName,
                BranchName = bankMasterVM.BranchName,
                BranchAddress = bankMasterVM.BranchAddress,
                Ifsc = bankMasterVM.Ifsc,
                Micr = bankMasterVM.Micr,
                IsActive = bankMasterVM.IsActive,
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
        /// <param name="bankMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(BankMasterVM bankMasterVM)
        {            
            var bankMasters = await _context.BankMasters.FirstOrDefaultAsync(e => e.Id == bankMasterVM.Id);
            if (bankMasters != null)
            {
                bankMasters.CollegeId = bankMasterVM.CollegeId;
                bankMasters.Name = bankMasterVM.Name;
                bankMasters.Actype = bankMasterVM.Actype;
                bankMasters.Acnumber = bankMasterVM.Acnumber;
                bankMasters.AcholderName = bankMasterVM.AcholderName;
                bankMasters.BranchName = bankMasterVM.BranchName;
                bankMasters.BranchAddress = bankMasterVM.BranchAddress;
                bankMasters.Ifsc = bankMasterVM.Ifsc;
                bankMasters.Micr = bankMasterVM.Micr;
                bankMasters.IsActive = bankMasterVM.IsActive;
                bankMasters.UpdatedBy = userId;
                bankMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(bankMasters).State = EntityState.Modified;
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
                            TableId = bankMasterVM.Id,
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
            var bankMasters = await _context.BankMasters.FindAsync(id);
            if (bankMasters != null)
            {
                bankMasters.IsDeleted = true;
                bankMasters.UpdatedBy = userId;
                bankMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(bankMasters).State = EntityState.Modified;
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
        public async Task<IEnumerable<OptionVM?>> GetOptions(long collegeId)
        {
            var response = new List<OptionVM>();
            response = await _redisService.GetRedisCacheData<List<OptionVM>>(getOptionsCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.BankMasters.Where(e => e.CollegeId == collegeId && e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
            {
                Id = e.Id,
                Name = e.Name
            }).ToListAsync<OptionVM>();
                await _redisService.SetRedisCacheData<List<OptionVM>>(getOptionsCacheKey, response);
            }
            return response;
        }
        #endregion GetOptions
    }
}
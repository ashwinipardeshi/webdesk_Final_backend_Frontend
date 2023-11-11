using Microsoft.EntityFrameworkCore;
using SaaSAppAPI.Data;
using SaaSAppAPI.Services.RESTServices.Contract;
using SaaSAppAPI.ViewModels.Common;

namespace SaaSAppAPI.Services.RESTServices.Implementation
{
    public class SaasErrorLogService : ISaasErrorLogService
    {
        private readonly SaaSdevDbFinalContext _context;
        public SaasErrorLogService(SaaSdevDbFinalContext context)
        {
            _context = context;
        }

        #region GetAllErrorLogs
        /// <summary>
        /// GetAllErrorLogs
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<ErrorLogVM?>> GetAllErrorLogs()
        {
            return await _context.ErrorLogs.OrderByDescending(e => e.Id).Select(e => new ErrorLogVM()
            {
                Id = e.Id,
                Controller = e.Controller,
                Action = e.Action,
                Message = e.Message,
                StackTrace = e.StackTrace,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate
            }).ToListAsync();
        }
        #endregion GetAllErrorLogs
    }
}

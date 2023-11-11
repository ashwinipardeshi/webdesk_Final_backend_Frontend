using AdmissionWebAPI.Data;
using AdmissionWebAPI.Services.Common.Contract;
using AdmissionWebAPI.ViewModels.Common;
using Microsoft.EntityFrameworkCore;

namespace AdmissionWebAPI.Services.Common.Implementation
{
    public class ErrorLogService:IErrorLogService
    {
        private readonly AdmissionDevFinalDbContext _context;
        public ErrorLogService(AdmissionDevFinalDbContext context)
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
            }).ToListAsync<ErrorLogVM?>();
        }
        #endregion GetAllErrorLogs
    }
}

using Authenticate.Data;
using Authenticate.Services.Contract;
using Authenticate.ViewModels.Common;
using Microsoft.EntityFrameworkCore;

namespace Authenticate.Services.Implementation
{
    public class ErrorLogService :IErrorLogService
    {
        private readonly AuthenticationDevFinalDbContext _context;
        public ErrorLogService(AuthenticationDevFinalDbContext context)
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

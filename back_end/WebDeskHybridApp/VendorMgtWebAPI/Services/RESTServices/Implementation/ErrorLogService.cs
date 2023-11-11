using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using VendorMgtWebAPI.Models;

using VendorMgtWebAPI.Services.RESTServices.Contract;
using VendorMgtWebAPI.ViewModels;

namespace VendorMgtWebAPI.Services.RESTServices.Implementation
{
    public class ErrorLogService : IErrorLogService
    {
        private readonly VendorMgtDevFinalDbContext _context;

        public ErrorLogService(VendorMgtDevFinalDbContext context)
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
            var response = await _context.ErrorLogs.OrderByDescending(e => e.Id).Select(e => new ErrorLogVM()
            {
                Id = e.Id,
                Controller = e.Controller,
                Action = e.Action,
                Message = e.Message,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
            }).ToListAsync();

            return response;
        }
        #endregion GetAllErrorLogs

    }
}


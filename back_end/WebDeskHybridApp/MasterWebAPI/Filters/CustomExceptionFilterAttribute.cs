﻿using MasterWebAPI.Data;
using MasterWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MasterWebAPI.Filters
{
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        private readonly MasterDevFinalDbContext _context;

        public CustomExceptionFilterAttribute(MasterDevFinalDbContext context)
        {
            _context = context;
        }

        public override void OnException(ExceptionContext context)
        {
            if (!context.ExceptionHandled)
            {
                context.ExceptionHandled = true;
                ErrorLog errorLogs = new ErrorLog()
                {
                    Controller = context.RouteData.Values["controller"].ToString(),
                    Action = context.RouteData.Values["action"].ToString(),
                    Message = context.Exception.Message,
                    StackTrace = context.Exception.StackTrace,
                    CreatedDate = DateTime.UtcNow
                };
                if (errorLogs != null)
                {
                    _context.ErrorLogs.Add(errorLogs);
                    _context.SaveChanges();
                    var result = new ViewResult { ViewName = "Error" };
                    context.Result = result;
                }
            }
        }
    }
}

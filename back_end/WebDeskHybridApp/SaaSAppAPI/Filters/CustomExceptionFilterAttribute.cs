using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SaaSAppAPI.Data;
using SaaSAppAPI.Models;

namespace SaaSAppAPI.Filters
{
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        private readonly SaaSdevDbFinalContext _context;

        public CustomExceptionFilterAttribute(SaaSdevDbFinalContext context)
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
                if(errorLogs != null )
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

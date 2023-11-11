using Authenticate.Data;
using Authenticate.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Authenticate.Filters
{
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        private readonly AuthenticationDevFinalDbContext _context;

        public CustomExceptionFilterAttribute(AuthenticationDevFinalDbContext context)
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
                    CreatedDate = DateTime.Now
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

using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using ExamWebAPI.Data;

namespace ExamWebAPI.Filters
{
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        private readonly ExamDevFinalDbContext _context;

        public CustomExceptionFilterAttribute(ExamDevFinalDbContext context)
        {
            _context = context;
        }

        public override void OnException(ExceptionContext context)
        {
            if (!context.ExceptionHandled)
            {
                context.ExceptionHandled = true;
                //ErrorLog errorLogs = new ErrorLog()
                //{
                //    Controller = context.RouteData.Values["controller"].ToString(),
                //    Action = context.RouteData.Values["action"].ToString(),
                //    Message = context.Exception.Message,
                //    StackTrace = context.Exception.StackTrace,
                //    CreatedDate = DateTime.UtcNow
                //};
                //if (errorLogs != null)
                //{
                //    _context.ErrorLogs.Add(errorLogs);
                //    _context.SaveChanges();
                //}
                var result = new ViewResult { ViewName = "Error" };
                context.Result = result;
            }
        }
    }
}

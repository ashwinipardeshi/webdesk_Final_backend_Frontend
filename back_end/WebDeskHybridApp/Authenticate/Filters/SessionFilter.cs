using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Authenticate.Filters
{
    public class SessionFilter : Attribute, IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.HttpContext.Session.GetString("LoginName") == null)
            {
                context.Result = new RedirectToRouteResult(new RouteValueDictionary(
                new
                {
                    Action = "Login",
                    Controller = "Home"
                }));
            }
        }
        public void OnActionExecuted(ActionExecutedContext context)
        {

        }
    }

    //public class HttpsOnly : Attribute, IAuthorizationFilter
    //{
    //    public void OnAuthorization(AuthorizationFilterContext context)
    //    {
    //        if (!context.HttpContext.Request.IsHttps)
    //            context.Result = new StatusCodeResult(StatusCodes.Status403Forbidden);
    //    }
    //}
}

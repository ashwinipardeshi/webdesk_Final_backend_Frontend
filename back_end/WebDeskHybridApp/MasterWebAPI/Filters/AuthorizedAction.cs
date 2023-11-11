using MasterWebAPI.Services.MasterContract;
using MasterWebAPI.ViewModels.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MasterWebAPI.Filters
{
    public class AuthorizedAction : ActionFilterAttribute
    {
        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            var _service = filterContext.HttpContext.RequestServices.GetService<ICommonServices>();

            string rId = filterContext.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("RoleId"))?.Value;
            long roleId;
            long.TryParse(rId, out roleId);

            var roleMenusURLs = _service.GetRoleMenusURLs(roleId).Result;

            if (roleMenusURLs != null)
            {
                if (string.IsNullOrEmpty(roleId.ToString()))
                {
                    filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary { { "controller", "AccessDeniedMaster" }, { "action", "AccessDeniedAPI" } });
                    return;
                }

                var controllerName = filterContext.RouteData.Values["controller"];
                var actionName = filterContext.RouteData.Values["action"];

                if (actionName.ToString().Equals("GetOptions"))
                    roleMenusURLs.Add(new RoleMenusURLVM() { URL = $"{controllerName}/GetOptions" });
                string currenturl = $"{controllerName}/{actionName}";

                if (!roleMenusURLs.Where(m => m.URL == currenturl).Any())
                {
                    filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary { { "controller", "AccessDeniedMaster" }, { "action", "AccessDeniedAPI" } });
                    return;
                }
            }
            //else
            //{
            //    filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary { { "controller", "AccessDeniedAdmission" }, { "action", "AccessDeniedAPI" } });
            //    return;
            //}
        }
    }
}

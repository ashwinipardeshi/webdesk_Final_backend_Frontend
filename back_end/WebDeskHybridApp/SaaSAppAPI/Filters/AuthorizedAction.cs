
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.Filters;
//using SaaSAppAPI.ViewModels.Common;

//namespace SaaSAppAPI.Filters
//{
//    public class AuthorizedAction : ActionFilterAttribute
//    {
//        public override void OnResultExecuting(ResultExecutingContext filterContext)
//        {
//        }

//        public override void OnActionExecuting(ActionExecutingContext filterContext)
//        {
//            base.OnActionExecuting(filterContext);

//            var _service = filterContext.HttpContext.RequestServices.GetService<ICommonServices>();

//            //long userId = Convert.ToInt64(filterContext.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("Id"))?.Value);
//            long roleId = Convert.ToInt64(filterContext.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("RoleId"))?.Value);
//            var roleMenusURLs = _service.GetRoleMenusURLs(roleId).Result;
            
//            if (!string.IsNullOrEmpty(roleId.ToString()))
//            {
//                //filterContext.HttpContext.Session.SetString("userId", userId.ToString()); // Set
//                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary { { "controller", "AccessDenied" }, { "action", "AccessDeniedAPI" } });
//                return;
//            }

//            var controllerName = filterContext.RouteData.Values["controller"];
            
//            var actionName = filterContext.RouteData.Values["action"];
//            if(actionName.ToString().Equals("GetOptions"))
//                roleMenusURLs.Add(new RoleMenusURLVM() { URL = $"{controllerName}/GetOptions" });
//            string currenturl = $"{controllerName}/{actionName}";

//            if (!roleMenusURLs.Where(m => m.URL == currenturl).Any())
//            {
//                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary { { "controller", "AccessDenied" }, { "action", "AccessDeniedAPI" } });
//                return;
//            }
//        }
//    }
//}

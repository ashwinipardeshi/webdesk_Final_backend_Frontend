using Authenticate.Data;
using Authenticate.Models;
using Microsoft.EntityFrameworkCore;

namespace Authenticate.Utility
{
    public static class AuthenticationCommonActivity
    {
        #region LoginActivityLog
        public static async Task LoginActivityLog(AuthenticationDevFinalDbContext _context, long userId, string ipaddress)
        {
            IHttpContextAccessor httpContextAccessor = new HttpContextAccessor();
            var loginActivity = await _context.UserLoginActivities.FirstOrDefaultAsync(l => l.UserId == userId);

            if (loginActivity != null)
            {
                loginActivity.LoginDateTime = DateTime.UtcNow;
                loginActivity.LoginIpaddress = ipaddress;
                loginActivity.LogoutDateTime = null;
                loginActivity.LogoutAddress = null;
                _context.UserLoginActivities.Update(loginActivity);
            }
            else
            {
                var userLoginActivity = new UserLoginActivity()
                {
                    UserId = userId,
                    LoginDateTime = DateTime.UtcNow,
                    LoginIpaddress = ipaddress
                };
                await _context.UserLoginActivities.AddAsync(userLoginActivity);
            }
            await _context.SaveChangesAsync();
        }
        #endregion LoginActivityLog

        #region LogoutActivityLog
        public static async Task<bool?> LogoutActivityLog(AuthenticationDevFinalDbContext _context, long userId, string ipaddress)
        {
            IHttpContextAccessor httpContextAccessor = new HttpContextAccessor();
            var logoutActivity = await _context.UserLoginActivities.FirstOrDefaultAsync(l => l.UserId == userId);
            if (logoutActivity != null)
            {
                logoutActivity.LogoutDateTime = DateTime.UtcNow;
                logoutActivity.LogoutAddress = ipaddress;
                _context.UserLoginActivities.Update(logoutActivity);
            }
            if (await _context.SaveChangesAsync() > 0)
                return true;
            return null;
        }
        #endregion LogoutActivityLog
    }
}


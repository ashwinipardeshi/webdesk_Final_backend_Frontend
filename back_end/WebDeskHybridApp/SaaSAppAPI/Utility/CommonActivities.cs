﻿using SaaSAppAPI.Models;
using SaaSAppAPI.ViewModels.Common;

namespace SaaSAppAPI.Utility
{
    public static class CommonActivities
    {
        public static async Task ActivityLog(ActivityLogVM activityLogVM)
        {
            await activityLogVM._context.UserActivityLogs.AddAsync(new UserActivityLog()
            {
                UserId = activityLogVM.UserId,
                TableName = activityLogVM.TableName,
                TableId = activityLogVM.TableId,
                Operation = activityLogVM.Operation,
                ActivityDateTime = DateTime.UtcNow,
                CollegeId = activityLogVM.CollegeId,
                Ipaddress = activityLogVM.Ipaddress
            });
            await activityLogVM._context.SaveChangesAsync();
        }
    }
}

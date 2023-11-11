using SaaSAppAPI.ViewModels.Common;

namespace SaaSAppAPI.ViewModels
{
    public class UserMasterVM : CommonProps
    {      
        public long RoleId { get; set; }

        public string? EmailId { get; set; }

        public string? Password { get; set; }

        public string Designation { get; set; } = null!;

        public bool IsDeleted { get; set; }

        
    }
}
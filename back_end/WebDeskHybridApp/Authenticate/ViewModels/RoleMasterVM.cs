using Authenticate.ViewModels.Common;

namespace Authenticate.ViewModels
{
    public class RoleMasterVM : CommonProps
    {
        public long CollegeId { get; set; }
        public string? Name { get; set; }
        public long? DepartmentId { get; set; }
        public string? Description { get; set; }
        public int? Precedence { get; set; }
    }
}

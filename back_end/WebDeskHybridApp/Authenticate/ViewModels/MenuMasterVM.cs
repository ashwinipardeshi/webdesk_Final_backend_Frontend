using Authenticate.ViewModels.Common;

namespace Authenticate.ViewModels
{
    public class MenuMasterVM : CommonProps
    {
        public long? ParentId { get; set; }
        public long? ModuleMasterId { get; set; }      
        public string? Icon { get; set; }
        public string? Url { get; set; }
        public bool IsMenu { get; set; }
        public int Precedence { get; set; }
    }
}

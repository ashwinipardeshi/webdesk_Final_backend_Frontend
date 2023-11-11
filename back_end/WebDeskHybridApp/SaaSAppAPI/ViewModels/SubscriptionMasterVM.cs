using SaaSAppAPI.ViewModels.Common;

namespace SaaSAppAPI.ViewModels
{
    public class SubscriptionMasterVM : CommonProps
    {
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int? Days { get; set; }
    }
}

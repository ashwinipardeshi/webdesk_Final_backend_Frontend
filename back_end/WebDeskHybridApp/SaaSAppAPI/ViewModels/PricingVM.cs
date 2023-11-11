namespace SaaSAppAPI.ViewModels
{
    public class PricingVM
    {
        public long Id { get; set; }
        public long ModuleMasterId { get; set; }
        public long SubscriptionMasterId { get; set; }
        public string Description { get; set; } = null!;
        public double? Price { get; set; }
        public double? Discount { get; set; }
        public double? FinalPrice { get; set; }
        public bool IsActive { get; set; }
        public long CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}

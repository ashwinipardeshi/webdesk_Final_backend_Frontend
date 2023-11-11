namespace SaaSAppAPI.ViewModels
{
    public class CollegeSubscriptionVM 
    {
        public long Id { get; set; }
        public long SubscriptionMasterId { get; set; }
        public long CollegeId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
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

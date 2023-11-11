namespace SaaSAppAPI.ViewModels.Common
{
    public class CommonProps: ListVM
    {
        public bool IsActive { get; set; }
        public long CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}

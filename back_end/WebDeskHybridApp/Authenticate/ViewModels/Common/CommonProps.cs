namespace Authenticate.ViewModels.Common
{
    public class CommonProps: OptionVM
    {
        public bool IsActive { get; set; }
        public long CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

    }
}

using VendorMgtWebAPI.Models;

namespace VendorMgtWebAPI.ViewModels.Common
{
    public class ActivityLogVM
    {
        public VendorMgtDevFinalDbContext _context { get; set; }
        public long UserId { get; set; }
        public string? TableName { get; set; }
        public long TableId { get; set; }
        public string? Operation { get; set; }
        public DateTime ActivityDateTime { get; set; }
        public long CollegeId { get; set; }
        public string? Ipaddress { get; set; }
    }
}

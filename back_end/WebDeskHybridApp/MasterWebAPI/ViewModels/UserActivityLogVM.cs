namespace MasterWebAPI.ViewModels
{
    public class UserActivityLogVM
    {
        public long Id { get; set; }

        public long UserId { get; set; }

        public string TableName { get; set; } = null!;

        public string Operation { get; set; } = null!;

        public DateTime ActivityDateTime { get; set; }

        public string? Ipaddress { get; set; }
    }
}

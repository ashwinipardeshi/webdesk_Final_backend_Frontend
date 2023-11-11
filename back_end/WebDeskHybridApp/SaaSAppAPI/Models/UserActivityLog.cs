using System;
using System.Collections.Generic;

namespace SaaSAppAPI.Models;

public partial class UserActivityLog
{
    public long Id { get; set; }

    public long CollegeId { get; set; }

    public long UserId { get; set; }

    public string TableName { get; set; } = null!;

    public long TableId { get; set; }

    public string Operation { get; set; } = null!;

    public DateTime ActivityDateTime { get; set; }

    public string? Ipaddress { get; set; }
}

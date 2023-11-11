using System;
using System.Collections.Generic;

namespace Authenticate.Models;

public partial class UserLoginActivity
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public DateTime LoginDateTime { get; set; }

    public string LoginIpaddress { get; set; } = null!;

    public DateTime? LogoutDateTime { get; set; }

    public string? LogoutAddress { get; set; }

    public virtual UserMaster User { get; set; } = null!;
}

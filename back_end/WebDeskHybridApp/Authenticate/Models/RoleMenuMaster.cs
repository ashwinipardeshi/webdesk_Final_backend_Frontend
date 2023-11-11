using System;
using System.Collections.Generic;

namespace Authenticate.Models;

public partial class RoleMenuMaster
{
    public long RoleId { get; set; }

    public long MenuId { get; set; }

    public bool IsActive { get; set; }

    public virtual MenuMaster Menu { get; set; } = null!;

    public virtual RoleMaster Role { get; set; } = null!;
}

using System;
using System.Collections.Generic;

namespace Authenticate.Models;

public partial class RoleMaster
{
    public long Id { get; set; }

    public long CollegeId { get; set; }

    public long? DepartmentId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public int? Precedence { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual ICollection<OnlineUser> OnlineUsers { get; set; } = new List<OnlineUser>();

    public virtual ICollection<RoleMenuMaster> RoleMenuMasters { get; set; } = new List<RoleMenuMaster>();

    public virtual ICollection<UserMaster> UserMasters { get; set; } = new List<UserMaster>();
}

using System;
using System.Collections.Generic;

namespace Authenticate.Models;

public partial class MenuMaster
{
    public long Id { get; set; }

    public long? ParentId { get; set; }

    public long? ModuleMasterId { get; set; }

    public string Name { get; set; } = null!;

    public string? Icon { get; set; }

    public string? Url { get; set; }

    public bool IsMenu { get; set; }

    public int Precedence { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual ICollection<MenuMaster> InverseParent { get; set; } = new List<MenuMaster>();

    public virtual MenuMaster? Parent { get; set; }

    public virtual ICollection<RoleMenuMaster> RoleMenuMasters { get; set; } = new List<RoleMenuMaster>();
}

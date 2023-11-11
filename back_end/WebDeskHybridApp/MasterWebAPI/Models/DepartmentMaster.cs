using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class DepartmentMaster
{
    public long Id { get; set; }

    public long? ParentId { get; set; }

    public long CollegeId { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual ICollection<BranchMaster> BranchMasters { get; set; } = new List<BranchMaster>();

    public virtual CollegeMaster College { get; set; } = null!;

    public virtual ICollection<DepartmentMaster> InverseParent { get; set; } = new List<DepartmentMaster>();

    public virtual DepartmentMaster? Parent { get; set; }
}

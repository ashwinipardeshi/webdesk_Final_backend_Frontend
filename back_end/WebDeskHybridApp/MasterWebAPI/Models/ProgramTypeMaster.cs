using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class ProgramTypeMaster
{
    public long Id { get; set; }

    public long CollegeId { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual CollegeMaster College { get; set; } = null!;

    public virtual ICollection<ProgramDetailMaster> ProgramDetailMasters { get; set; } = new List<ProgramDetailMaster>();

    public virtual ICollection<ProgramMaster> ProgramMasters { get; set; } = new List<ProgramMaster>();
}

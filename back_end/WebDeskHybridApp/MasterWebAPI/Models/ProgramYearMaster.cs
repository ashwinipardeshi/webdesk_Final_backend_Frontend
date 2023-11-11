using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class ProgramYearMaster
{
    public long Id { get; set; }

    public long CollegeId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual CollegeMaster College { get; set; } = null!;

    public virtual ICollection<SemesterDetailsMaster> SemesterDetailsMasters { get; set; } = new List<SemesterDetailsMaster>();
}

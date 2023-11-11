using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class AcademicYearMaster
{
    public long Id { get; set; }

    public long CollegeId { get; set; }

    public long StreamId { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime StartYear { get; set; }

    public DateTime EndYear { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual CollegeMaster College { get; set; } = null!;

    public virtual ICollection<SemesterDetailsMaster> SemesterDetailsMasters { get; set; } = new List<SemesterDetailsMaster>();

    public virtual StreamMaster Stream { get; set; } = null!;

    public virtual ICollection<SyllabusPatternMaster> SyllabusPatternMasters { get; set; } = new List<SyllabusPatternMaster>();
}

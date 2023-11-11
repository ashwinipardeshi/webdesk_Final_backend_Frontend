using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class SyllabusPatternMaster
{
    public long Id { get; set; }

    public long CollegeId { get; set; }

    public long AcademicYearMasterId { get; set; }

    public long ProgramMasterId { get; set; }

    public string Name { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual AcademicYearMaster AcademicYearMaster { get; set; } = null!;

    public virtual CollegeMaster College { get; set; } = null!;

    public virtual ICollection<ProgramDetailMaster> ProgramDetailMasters { get; set; } = new List<ProgramDetailMaster>();

    public virtual ProgramMaster ProgramMaster { get; set; } = null!;
}

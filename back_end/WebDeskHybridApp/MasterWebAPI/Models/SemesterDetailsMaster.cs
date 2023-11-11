using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class SemesterDetailsMaster
{
    public long Id { get; set; }

    public long SemesterMasterId { get; set; }

    public long ProgramMasterId { get; set; }

    public long ProgramYearId { get; set; }

    public long AcademicYearId { get; set; }

    public string Year { get; set; } = null!;

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual AcademicYearMaster AcademicYear { get; set; } = null!;

    public virtual ProgramMaster ProgramMaster { get; set; } = null!;

    public virtual ProgramYearMaster ProgramYear { get; set; } = null!;

    public virtual SemesterGmaster SemesterMaster { get; set; } = null!;
}

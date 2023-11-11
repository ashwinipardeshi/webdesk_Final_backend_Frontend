using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class ProgramDetailMaster
{
    public long Id { get; set; }

    public long ProgramTypeId { get; set; }

    public long ProgramMasterId { get; set; }

    public long SyllabusPatternMasterId { get; set; }

    public byte Duration { get; set; }

    public byte NoOfSem { get; set; }

    public double MinCredit { get; set; }

    public double MaxCredit { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual ProgramMaster ProgramMaster { get; set; } = null!;

    public virtual ProgramTypeMaster ProgramType { get; set; } = null!;

    public virtual SyllabusPatternMaster SyllabusPatternMaster { get; set; } = null!;
}

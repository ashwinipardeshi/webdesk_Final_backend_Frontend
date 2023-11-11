﻿using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class StreamMaster
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

    public virtual ICollection<AcademicYearMaster> AcademicYearMasters { get; set; } = new List<AcademicYearMaster>();

    public virtual ICollection<AccreditationMaster> AccreditationMasters { get; set; } = new List<AccreditationMaster>();

    public virtual CollegeMaster College { get; set; } = null!;

    public virtual ICollection<ProgramMaster> ProgramMasters { get; set; } = new List<ProgramMaster>();
}

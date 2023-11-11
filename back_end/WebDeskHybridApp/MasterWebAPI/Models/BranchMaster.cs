using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class BranchMaster
{
    public long Id { get; set; }

    public long CollegeId { get; set; }

    public long ProgramMasterId { get; set; }

    public long StudyMasterId { get; set; }

    public long DepartmentId { get; set; }

    public string Name { get; set; } = null!;

    public string Abbreviation { get; set; } = null!;

    public string? BranchPrefix { get; set; }

    public string? Code { get; set; }

    public DateTime DateOfIntrodution { get; set; }

    public string MediumOfInstruction { get; set; } = null!;

    public string AffiliationStatus { get; set; } = null!;

    public string Accreditationstatus { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual CollegeMaster College { get; set; } = null!;

    public virtual DepartmentMaster Department { get; set; } = null!;

    public virtual ProgramMaster ProgramMaster { get; set; } = null!;

    public virtual StudyMaster StudyMaster { get; set; } = null!;
}

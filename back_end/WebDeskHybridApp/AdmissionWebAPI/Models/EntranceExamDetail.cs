using System;
using System.Collections.Generic;

namespace AdmissionWebAPI.Models;

public partial class EntranceExamDetail
{
    public long Id { get; set; }

    public long StudentAdmissionId { get; set; }

    public string? EntranceType { get; set; }

    public string? RollNumber { get; set; }

    public double? PhysicsMarks { get; set; }

    public double? ChemistryMarks { get; set; }

    public double? MathsMarks { get; set; }

    public double? TotalMarks { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual StudentAdmission StudentAdmission { get; set; } = null!;
}

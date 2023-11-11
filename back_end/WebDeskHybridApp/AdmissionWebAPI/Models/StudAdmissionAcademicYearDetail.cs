using System;
using System.Collections.Generic;

namespace AdmissionWebAPI.Models;

public partial class StudAdmissionAcademicYearDetail
{
    public long Id { get; set; }

    public long StudentAdmissionId { get; set; }

    public long AcademicYearId { get; set; }

    public long? ProgramYearId { get; set; }

    public long? ProgramId { get; set; }

    public long? BranchId { get; set; }

    public long? AcademicStatusId { get; set; }

    public string? ReasonOfAcademicStatus { get; set; }

    public long? AdmissionCategoryId { get; set; }

    public long? AnnualIncomeId { get; set; }

    public int? ExamStatus { get; set; }

    public int? PassoutStatus { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual StudentAdmission StudentAdmission { get; set; } = null!;
}

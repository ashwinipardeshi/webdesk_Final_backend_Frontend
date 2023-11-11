using System;
using System.Collections.Generic;

namespace AdmissionWebAPI.Models;

public partial class CurrentAcademicDetail
{
    public long Id { get; set; }

    public long StudentAdmissionId { get; set; }

    public string? Class { get; set; }

    public string? BoardUniversity { get; set; }

    public string? Month { get; set; }

    public int? Year { get; set; }

    public string? SeatNo { get; set; }

    public double? MarksObtained { get; set; }

    public double? OutOf { get; set; }

    public double? Percentage { get; set; }

    public int? Attempts { get; set; }

    public long? ResultStatus { get; set; }

    public string? BacklogStatus { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual StudentAdmission StudentAdmission { get; set; } = null!;
}

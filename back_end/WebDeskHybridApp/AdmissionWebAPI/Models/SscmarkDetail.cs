using System;
using System.Collections.Generic;

namespace AdmissionWebAPI.Models;

public partial class SscmarkDetail
{
    public long Id { get; set; }

    public long StudentAdmissionId { get; set; }

    public double? MarksObtained { get; set; }

    public double? MarksOutOf { get; set; }

    public double? Percentage { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual StudentAdmission StudentAdmission { get; set; } = null!;
}

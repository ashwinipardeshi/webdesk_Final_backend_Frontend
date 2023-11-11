using System;
using System.Collections.Generic;

namespace AdmissionWebAPI.Models;

public partial class InsuranceDetail
{
    public long Id { get; set; }

    public long StudentAdmissionId { get; set; }

    public string? LastName { get; set; }

    public string? FirstName { get; set; }

    public string? MiddleName { get; set; }

    public string? Relation { get; set; }

    public string? StudentParentBeneficiary { get; set; }

    public string? StudentParentBenefit { get; set; }

    public string SumInsured { get; set; } = null!;

    public double? InsurancePremium { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public int? Age { get; set; }

    public string? AadharNo { get; set; }

    public bool IsActive { get; set; }

    public bool? IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual StudentAdmission StudentAdmission { get; set; } = null!;
}

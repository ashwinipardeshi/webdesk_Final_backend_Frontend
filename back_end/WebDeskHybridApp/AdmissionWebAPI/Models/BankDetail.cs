using System;
using System.Collections.Generic;

namespace AdmissionWebAPI.Models;

public partial class BankDetail
{
    public long Id { get; set; }

    public long StudentAdmissionId { get; set; }

    public string? PersonType { get; set; }

    public string? AccountType { get; set; }

    public string? Ifsccode { get; set; }

    public string? BankName { get; set; }

    public string? BranchName { get; set; }

    public string? BranchCode { get; set; }

    public string? BankAddress { get; set; }

    public string? AccountNo { get; set; }

    public string? AccountHolderName { get; set; }

    public string? Micrcode { get; set; }

    public string? CanceledChequePath { get; set; }

    public bool? IsAccLinkedWithAadhar { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual StudentAdmission StudentAdmission { get; set; } = null!;
}

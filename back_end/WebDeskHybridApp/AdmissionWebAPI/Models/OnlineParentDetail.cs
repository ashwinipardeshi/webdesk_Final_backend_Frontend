using System;
using System.Collections.Generic;

namespace AdmissionWebAPI.Models;

public partial class OnlineParentDetail
{
    public long Id { get; set; }

    public long OnlineStudentAdmissionId { get; set; }

    public int? Relation { get; set; }

    public string? LivingStatus { get; set; }

    public string? LastName { get; set; }

    public string? FirstName { get; set; }

    public string? MiddleName { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public string? Qualification { get; set; }

    public string? Profession { get; set; }

    public string? EmployedIn { get; set; }

    public string? OrganizationName { get; set; }

    public string? Designation { get; set; }

    public string? Income { get; set; }

    public string? MobileNo { get; set; }

    public string? MailId { get; set; }

    public bool IsDefaultCommunication { get; set; }

    public string? Image { get; set; }

    public string? Signature { get; set; }

    public string? GuaradianRelation { get; set; }

    public string? GuaradianAddress { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual OnlineStudentAdmission OnlineStudentAdmission { get; set; } = null!;
}

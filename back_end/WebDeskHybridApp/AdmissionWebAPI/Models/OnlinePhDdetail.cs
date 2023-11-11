using System;
using System.Collections.Generic;

namespace AdmissionWebAPI.Models;

public partial class OnlinePhDdetail
{
    public long Id { get; set; }

    public long OnlineStudentAdmissionId { get; set; }

    public long? Faculty { get; set; }

    public string? Subject { get; set; }

    public string? ResearchTopic { get; set; }

    public string? PresentOccupationOrEmployment { get; set; }

    public string? EmploymentName { get; set; }

    public string? EmploymentAddress { get; set; }

    public string? ProfessionalExperienceNature { get; set; }

    public string? InstituteOfProfessionalExp { get; set; }

    public string? ProfessionaExpPeriod { get; set; }

    public string? MphilDissertationTitle { get; set; }

    public bool? IsProposalTopicRelateMphil { get; set; }

    public string? ReasearchGuideName { get; set; }

    public string? CoGuideName { get; set; }

    public string? ApprovedName { get; set; }

    public string? AddressOfApproved { get; set; }

    public string? ResearchPlace { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual OnlineStudentAdmission OnlineStudentAdmission { get; set; } = null!;
}

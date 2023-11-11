using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class CollegeMaster
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string ShortName { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string University { get; set; } = null!;

    public string Category { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Website { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PhoneNo { get; set; } = null!;

    public string Cpname { get; set; } = null!;

    public string Cpemail { get; set; } = null!;

    public string Cpmob { get; set; } = null!;

    public string Type { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual ICollection<AcademicStatusMaster> AcademicStatusMasters { get; set; } = new List<AcademicStatusMaster>();

    public virtual ICollection<AcademicYearMaster> AcademicYearMasters { get; set; } = new List<AcademicYearMaster>();

    public virtual ICollection<AccreditationMaster> AccreditationMasters { get; set; } = new List<AccreditationMaster>();

    public virtual ICollection<AdmissionTypeMaster> AdmissionTypeMasters { get; set; } = new List<AdmissionTypeMaster>();

    public virtual ICollection<AdmittedTypeMaster> AdmittedTypeMasters { get; set; } = new List<AdmittedTypeMaster>();

    public virtual ICollection<AllotmentCategoryMaster> AllotmentCategoryMasters { get; set; } = new List<AllotmentCategoryMaster>();

    public virtual ICollection<ApplicationRejectReasonMaster> ApplicationRejectReasonMasters { get; set; } = new List<ApplicationRejectReasonMaster>();

    public virtual ICollection<ApplicationStatusMaster> ApplicationStatusMasters { get; set; } = new List<ApplicationStatusMaster>();

    public virtual ICollection<BankMaster> BankMasters { get; set; } = new List<BankMaster>();

    public virtual ICollection<BranchMaster> BranchMasters { get; set; } = new List<BranchMaster>();

    public virtual ICollection<CourseTypeMaster> CourseTypeMasters { get; set; } = new List<CourseTypeMaster>();

    public virtual ICollection<DepartmentMaster> DepartmentMasters { get; set; } = new List<DepartmentMaster>();

    public virtual ICollection<DesignationMaster> DesignationMasters { get; set; } = new List<DesignationMaster>();

    public virtual ICollection<DivisionMaster> DivisionMasters { get; set; } = new List<DivisionMaster>();

    public virtual ICollection<DocumentMaster> DocumentMasters { get; set; } = new List<DocumentMaster>();

    public virtual ICollection<EvaluationMaster> EvaluationMasters { get; set; } = new List<EvaluationMaster>();

    public virtual ICollection<ExamTypeMaster> ExamTypeMasters { get; set; } = new List<ExamTypeMaster>();

    public virtual ICollection<FeeHeadMaster> FeeHeadMasters { get; set; } = new List<FeeHeadMaster>();

    public virtual ICollection<FeeHeadTypeMaster> FeeHeadTypeMasters { get; set; } = new List<FeeHeadTypeMaster>();

    public virtual ICollection<ModeOfAdmissionMaster> ModeOfAdmissionMasters { get; set; } = new List<ModeOfAdmissionMaster>();

    public virtual ICollection<ProgramMaster> ProgramMasters { get; set; } = new List<ProgramMaster>();

    public virtual ICollection<ProgramTypeMaster> ProgramTypeMasters { get; set; } = new List<ProgramTypeMaster>();

    public virtual ICollection<ProgramYearMaster> ProgramYearMasters { get; set; } = new List<ProgramYearMaster>();

    public virtual ICollection<ReservationCategoryMaster> ReservationCategoryMasters { get; set; } = new List<ReservationCategoryMaster>();

    public virtual ICollection<SeatTypeMaster> SeatTypeMasters { get; set; } = new List<SeatTypeMaster>();

    public virtual ICollection<SmstemplateMaster> SmstemplateMasters { get; set; } = new List<SmstemplateMaster>();

    public virtual ICollection<SmtpconfigMaster> SmtpconfigMasters { get; set; } = new List<SmtpconfigMaster>();

    public virtual ICollection<StreamMaster> StreamMasters { get; set; } = new List<StreamMaster>();

    public virtual ICollection<StudyMaster> StudyMasters { get; set; } = new List<StudyMaster>();

    public virtual ICollection<SyllabusPatternMaster> SyllabusPatternMasters { get; set; } = new List<SyllabusPatternMaster>();

    public virtual ICollection<UserActivityLog> UserActivityLogs { get; set; } = new List<UserActivityLog>();
}

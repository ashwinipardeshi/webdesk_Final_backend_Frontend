using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineStudAdmissionAYDetailODataVM : CommonProps
    {
        public long Id { get; set; }

        public long StudentAdmissionId { get; set; }

        public long AcademicYearId { get; set; }

        public string? AcademicYearAYName { get; set; }

        public long? ProgramYearId { get; set; }

        public string? ProgramYearName { get; set; }

        public long? BranchId { get; set; }

        public string? BranchName { get; set; }      

        public long? AcademicStatusId { get; set; }

        public string? AcademicStatusName { get; set; }

        public long? AdmissionCategoryId { get; set; }

        public string? AdmissionCategoryName { get; set; }

        public long? AnnualIncomeId { get; set; }

        public string? AnnualIncomeName { get; set; }

        public string? ReasonOfAcademicStatus { get; set; }

        public long? ProgramId { get; set; }      
        
        public string? ProgramName { get; set;}

        
    }
}

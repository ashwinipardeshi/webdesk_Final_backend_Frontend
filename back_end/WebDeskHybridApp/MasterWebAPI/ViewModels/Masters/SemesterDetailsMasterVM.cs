using System.ComponentModel.DataAnnotations;

namespace MasterWebAPI.ViewModels.Masters
{ 
    public class SemesterDetailsMasterVM
    {      
        public long Id { get; set; }

        [Required(ErrorMessage = "SemesterMaster Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid SemesterMaster Id")]
        public long SemesterMasterId { get; set; }

        [Required(ErrorMessage = "ProgramMaster Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid ProgramMaster Id")]
        public long ProgramMasterId { get; set; }

        [Required(ErrorMessage = "ProgramYear Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid ProgramYear Id")]
        public long ProgramYearId { get; set; }

        [Required(ErrorMessage = "AcademicYear Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid AcademicYear Id")]
        public long AcademicYearId { get; set; }
        public string? SemesterMasterName { get; set; }        
        public string? ProgramMasterName { get; set; }        
        public string? ProgramYearName { get; set; }       
        public string? AcademicYearName { get; set; }

        [Required(ErrorMessage = "Enter The Year"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Year")]
        public string Year { get; set; } = null!;

        [Required, DataType(DataType.Date)]
        public DateTime StartDate { get; set; }

        [Required, DataType(DataType.Date)]
        public DateTime EndDate { get; set; }

        [Required, Range(typeof(bool), "false", "true", ErrorMessage = "IsActive Field is required")]
        public bool IsActive { get; set; }        
        public long CreatedBy { get; set; }    
        public DateTime CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}

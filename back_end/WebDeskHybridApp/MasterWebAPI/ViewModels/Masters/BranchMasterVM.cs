using MasterWebAPI.ViewModels.Common;
using System.ComponentModel.DataAnnotations;

namespace MasterWebAPI.ViewModels.Masters
{
    public class BranchMasterVM : CommonProps
    {
        [Required(ErrorMessage = "College Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid College Id")]
        public long CollegeId { get; set; }
        public string? CollegeName { get; set; }

        [Required(ErrorMessage = "Program Master Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid Program Master Id")]
        public long ProgramMasterId { get; set; }
        public string? ProgramName { get; set; }

        [Required(ErrorMessage = "Study Master Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid Study Master Id")]
        public long StudyMasterId { get; set; }
        public string? StudyName { get; set; }

        [Required(ErrorMessage = "Department Master Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid Department Master Id")]
        public long DepartmentId { get; set; }
        public string? DepartmentName { get; set; }

        [Required(ErrorMessage = "Abbreviation is required."), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Enter Valid Abbreviation Id")]
        public string Abbreviation { get; set; } = null!;

        [Required(ErrorMessage = "Enter The Branch Prefix"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid BranchPrefix")]
        public string? BranchPrefix { get; set; }

        [Required, DataType(DataType.Date)]
        public DateTime DateOfIntrodution { get; set; }

        [Required(ErrorMessage = "Please Enter Medium of Instruction")]
        [RegularExpression(@"^[a-zA-Z''-'.(),\s]{1,100}$", ErrorMessage = "Please Enter Medium of Instruction")]
        public string MediumOfInstruction { get; set; } = null!;

        [Required(ErrorMessage = "Enter The Affiliation Status"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Affiliation Status")]
        public string AffiliationStatus { get; set; } = null!;

        [Required(ErrorMessage = "Enter The Accreditation Status"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Accreditation Status")]
        public string Accreditationstatus { get; set; } = null!;

        [Required(ErrorMessage = "Enter The Accreditation Status"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Accreditation Status")]
        public string? Code { get; set; }
    }
}

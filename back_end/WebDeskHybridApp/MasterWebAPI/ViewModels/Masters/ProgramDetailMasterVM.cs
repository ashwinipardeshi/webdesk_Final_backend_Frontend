using MasterWebAPI.Models;
using MasterWebAPI.ViewModels.Common;
using System.ComponentModel.DataAnnotations;

namespace MasterWebAPI.ViewModels.Masters
{
    public class ProgramDetailMasterVM
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "ProgramType Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid ProgramType Id")]
        public long ProgramTypeId { get; set; }

        [Required(ErrorMessage = "ProgramMaster Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid ProgramMaster Id")]
        public long ProgramMasterId { get; set; }

        [Required(ErrorMessage =" SyllabusPattern Master Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid SyllabusPattern Id")]
        public long SyllabusPatternMasterId { get; set; }        
        public string? ProgramTypeName { get; set; } = null!;        
        public string? ProgramMasterName { get; set; } = null!;        
        public string? SyllabusPatternMasterName { get; set; } = null!;

        [Display(Name = "Duration")]
        [Required(ErrorMessage = "Please Enter Duration")]   
        public byte Duration { get; set; }

        [Display(Name = "NoOfSem")]
        [Required(ErrorMessage = "Please Enter NoOfSem")]
        public byte NoOfSem { get; set; }

        [Display(Name = "MimCredit")]
        [Required(ErrorMessage = "Please Enter MimCredit")]
        public double MinCredit { get; set; }

        [Display(Name = "MaxCredit")]
        [Required(ErrorMessage = "Please Enter MaxCredit")]
        public double MaxCredit { get; set; }

        [Required, Range(typeof(bool), "false", "true", ErrorMessage = "IsActive Field is required")]
        public bool IsActive { get; set; }
        public long CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}

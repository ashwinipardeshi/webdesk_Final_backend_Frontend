﻿using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineEntranceExamDetailsVM : CommonProps
    {
        public long Id { get; set; }

        public long UserId { get; set; }

        [Required(ErrorMessage = "Enter The Value")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid StudentAdmission Id")]
        public long StudentAdmissionId { get; set; }

        public string? EntranceType { get; set; }

        public string? RollNumber { get; set; }

        public double? PhysicsMarks { get; set; }

        public double? ChemistryMarks { get; set; }

        public double? MathsMarks { get; set; }

        public double? TotalMarks { get; set; }
    }
}

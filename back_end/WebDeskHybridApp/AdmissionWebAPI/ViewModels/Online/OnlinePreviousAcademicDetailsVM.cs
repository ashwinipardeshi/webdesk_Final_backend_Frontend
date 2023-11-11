﻿using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Online
{
    public class OnlinePreviousAcademicDetailsVM : CommonProps
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "Enter The OnlineStudentAdmission Id..")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid OnlineStudentAdmission Id")]
        public long OnlineStudentAdmissionId { get; set; }
        public string? AcademicClass { get; set; }
        public string? SchoolCollege { get; set; }
        public string? BoardUniversity { get; set; }
        public string? Month { get; set; }
        public int? Year { get; set; }
        public string? SeatNo { get; set; }
        public double? MarksObtained { get; set; }
        public double? OutOf { get; set; }
        public double? Percentage { get; set; }
    }
}

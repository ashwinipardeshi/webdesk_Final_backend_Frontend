﻿namespace SaaSAppAPI.ViewModels
{
    public class UserMasterDataVM
    {
        public long CollegeId { get; set; }
        public long AcademicYearId { get; set; }
        public long RoleId { get; set; }
        public long DepartmentId { get; set; }
        public string? StudentMailId { get; set; }
        public string FirstName { get; set; }
        public string? Mobile { get; set; }
        public long createdBy { get; set; }
    }
}

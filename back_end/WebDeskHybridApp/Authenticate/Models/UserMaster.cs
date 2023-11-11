using System;
using System.Collections.Generic;

namespace Authenticate.Models;

public partial class UserMaster
{
    public long Id { get; set; }

    public long RoleId { get; set; }

    public long CollegeId { get; set; }

    public long DepartmentId { get; set; }

    public long? AcademicYearId { get; set; }

    public string EmailId { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Mobile { get; set; }

    public bool? ChangeForgotPasswordFlag { get; set; }

    public string? RefTableName { get; set; }

    public long? RefTableId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual RoleMaster Role { get; set; } = null!;

    public virtual ICollection<UserLoginActivity> UserLoginActivities { get; set; } = new List<UserLoginActivity>();
}

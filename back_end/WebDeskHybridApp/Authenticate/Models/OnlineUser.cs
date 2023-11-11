using System;
using System.Collections.Generic;

namespace Authenticate.Models;

public partial class OnlineUser
{
    public long Id { get; set; }

    public long RoleId { get; set; }

    public long CollegeId { get; set; }

    public long DepartmentId { get; set; }

    public long AcademicYearId { get; set; }

    public string Name { get; set; } = null!;

    public string EmailId { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Mobile { get; set; } = null!;

    public string? RefTableName { get; set; }

    public long? RefTableId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime CreatedDate { get; set; }

    public virtual RoleMaster Role { get; set; } = null!;
}

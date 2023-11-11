using System;
using System.Collections.Generic;

namespace SaaSAppAPI.Models;

public partial class UserMaster
{
    public long Id { get; set; }

    public long RoleId { get; set; }

    public string Name { get; set; } = null!;

    public string? EmailId { get; set; }

    public string? Password { get; set; }

    public string Designation { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }
}

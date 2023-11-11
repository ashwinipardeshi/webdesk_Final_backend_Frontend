using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class CommonMasterDetail
{
    public long Id { get; set; }

    public long CollegeId { get; set; }

    public long CommonMasterId { get; set; }

    public string Name { get; set; } = null!;

    public bool IsActive { get; set; }

    public virtual CommonMaster CommonMaster { get; set; } = null!;
}

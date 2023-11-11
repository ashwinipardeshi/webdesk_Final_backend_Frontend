using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class CommonMaster
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public bool IsActive { get; set; }

    public virtual ICollection<CommonMasterDetail> CommonMasterDetails { get; set; } = new List<CommonMasterDetail>();
}

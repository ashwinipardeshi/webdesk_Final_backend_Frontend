using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class CommonGmaster
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public bool? IsActive { get; set; }

    public virtual ICollection<CommonGmasterDetail> CommonGmasterDetails { get; set; } = new List<CommonGmasterDetail>();
}

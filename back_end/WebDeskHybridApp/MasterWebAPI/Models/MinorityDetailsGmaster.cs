using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class MinorityDetailsGmaster
{
    public long Id { get; set; }

    public long MinorityMasterId { get; set; }

    public string Name { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual MinorityGmaster MinorityMaster { get; set; } = null!;
}

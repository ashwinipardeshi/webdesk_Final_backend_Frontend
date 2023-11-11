using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class TalukaGmaster
{
    public long Id { get; set; }

    public long DistrictId { get; set; }

    public string Name { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual DistrictGmaster District { get; set; } = null!;
}

using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class FeeHeadMaster
{
    public long Id { get; set; }

    public long CollegeId { get; set; }

    public long FeeHeadTypeMasterId { get; set; }

    public string Name { get; set; } = null!;

    public decimal Fees { get; set; }

    public string Description { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual CollegeMaster College { get; set; } = null!;

    public virtual FeeHeadTypeMaster FeeHeadTypeMaster { get; set; } = null!;
}

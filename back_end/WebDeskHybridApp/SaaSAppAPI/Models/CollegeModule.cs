using System;
using System.Collections.Generic;

namespace SaaSAppAPI.Models;

public partial class CollegeModule
{
    public long Id { get; set; }

    public long CollegeSubscriptionId { get; set; }

    public long ModuleMasterId { get; set; }

    public long CollegeId { get; set; }

    public double? Price { get; set; }

    public double? Discount { get; set; }

    public double? FinalPrice { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual CollegeSubscription CollegeSubscription { get; set; } = null!;

    public virtual ModuleMaster ModuleMaster { get; set; } = null!;
}

using System;
using System.Collections.Generic;

namespace SaaSAppAPI.Models;

public partial class CollegeSubscription
{
    public long Id { get; set; }

    public long SubscriptionMasterId { get; set; }

    public long CollegeId { get; set; }

    public DateTime FromDate { get; set; }

    public DateTime ToDate { get; set; }

    public double? Price { get; set; }

    public double? Discount { get; set; }

    public double? FinalPrice { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual CollegeMainMaster College { get; set; } = null!;

    public virtual ICollection<CollegeModule> CollegeModules { get; set; } = new List<CollegeModule>();

    public virtual SubscriptionMaster SubscriptionMaster { get; set; } = null!;
}

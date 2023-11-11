using System;
using System.Collections.Generic;

namespace SaaSAppAPI.Models;

public partial class SubscriptionMaster
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public int? Days { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual ICollection<CollegeSubscription> CollegeSubscriptions { get; set; } = new List<CollegeSubscription>();

    public virtual ICollection<Pricing> Pricings { get; set; } = new List<Pricing>();
}

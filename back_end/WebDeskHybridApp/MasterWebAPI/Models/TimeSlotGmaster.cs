using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class TimeSlotGmaster
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public DateTime FromTime { get; set; }

    public DateTime ToTime { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }
}

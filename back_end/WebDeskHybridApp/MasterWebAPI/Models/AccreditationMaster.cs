using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class AccreditationMaster
{
    public long Id { get; set; }

    public long CollegeId { get; set; }

    public long StreamId { get; set; }

    public string Name { get; set; } = null!;

    public int Year { get; set; }

    public string Grade { get; set; } = null!;

    public DateTime VaildTill { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual CollegeMaster College { get; set; } = null!;

    public virtual StreamMaster Stream { get; set; } = null!;
}

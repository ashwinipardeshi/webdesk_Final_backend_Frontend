using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class ReligionMaster
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsDelete { get; set; }

    public long? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }
}

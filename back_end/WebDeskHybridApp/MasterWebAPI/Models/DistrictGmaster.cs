using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class DistrictGmaster
{
    public long Id { get; set; }

    public long StateId { get; set; }

    public string Name { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual StateGmaster State { get; set; } = null!;

    public virtual ICollection<TalukaGmaster> TalukaGmasters { get; set; } = new List<TalukaGmaster>();
}

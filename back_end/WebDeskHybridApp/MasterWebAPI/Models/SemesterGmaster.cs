﻿using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class SemesterGmaster
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public int SortOrder { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual ICollection<SemesterDetailsMaster> SemesterDetailsMasters { get; set; } = new List<SemesterDetailsMaster>();
}

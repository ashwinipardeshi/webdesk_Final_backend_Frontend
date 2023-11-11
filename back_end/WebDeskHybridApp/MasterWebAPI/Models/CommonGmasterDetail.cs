using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class CommonGmasterDetail
{
    public long Id { get; set; }

    public long CommonGmasterId { get; set; }

    public string Name { get; set; } = null!;

    public bool? IsActive { get; set; }

    public virtual CommonGmaster CommonGmaster { get; set; } = null!;
}

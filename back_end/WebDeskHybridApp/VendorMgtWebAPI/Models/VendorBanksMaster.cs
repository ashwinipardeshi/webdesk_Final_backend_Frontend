﻿using System;
using System.Collections.Generic;

namespace VendorMgtWebAPI.Models;

public partial class VendorBanksMaster
{
    public long Id { get; set; }

    public long VendorMasterId { get; set; }

    public long CollegeId { get; set; }

    public string Name { get; set; } = null!;

    public string BranchName { get; set; } = null!;

    public string AccountName { get; set; } = null!;

    public string AccountType { get; set; } = null!;

    public string AccountNo { get; set; } = null!;

    public string Ifsccode { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual VendorMaster VendorMaster { get; set; } = null!;
}

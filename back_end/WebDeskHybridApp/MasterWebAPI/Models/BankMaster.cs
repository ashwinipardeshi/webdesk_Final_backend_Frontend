using System;
using System.Collections.Generic;

namespace MasterWebAPI.Models;

public partial class BankMaster
{
    public long Id { get; set; }

    public long CollegeId { get; set; }

    public string Name { get; set; } = null!;

    public string Actype { get; set; } = null!;

    public string Acnumber { get; set; } = null!;

    public string AcholderName { get; set; } = null!;

    public string BranchName { get; set; } = null!;

    public string BranchAddress { get; set; } = null!;

    public string Ifsc { get; set; } = null!;

    public string Micr { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual CollegeMaster College { get; set; } = null!;
}

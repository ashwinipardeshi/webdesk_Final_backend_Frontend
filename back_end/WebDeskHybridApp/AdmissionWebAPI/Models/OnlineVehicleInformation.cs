using System;
using System.Collections.Generic;

namespace AdmissionWebAPI.Models;

public partial class OnlineVehicleInformation
{
    public long Id { get; set; }

    public long OnlineStudentAdmissionId { get; set; }

    public string VehicleType { get; set; } = null!;

    public byte NoOfVehicle { get; set; }

    public string? VehicleInsurancePolicyNo { get; set; }

    public bool? Puc { get; set; }

    public string? Rc { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual OnlineStudentAdmission OnlineStudentAdmission { get; set; } = null!;
}

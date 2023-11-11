using System;
using System.Collections.Generic;

namespace AdmissionWebAPI.Models;

public partial class VehicleInformation
{
    public long Id { get; set; }

    public long StudentAdmissionId { get; set; }

    public string VehicleType { get; set; } = null!;

    public byte NoOfVehicle { get; set; }

    public string? VehicleNo { get; set; }

    public string? VehicleInsurancePolicyNo { get; set; }

    public bool? Puc { get; set; }

    public string? Rc { get; set; }

    public DateTime? Rcvalidity { get; set; }

    public string? VehicleOwnerName { get; set; }

    public DateTime? ValidityOfLicence { get; set; }

    public string? VehicleRegistrationNo { get; set; }

    public string? EngineNo { get; set; }

    public string? DrivingLicence { get; set; }

    public string? ChassisNo { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual StudentAdmission StudentAdmission { get; set; } = null!;
}

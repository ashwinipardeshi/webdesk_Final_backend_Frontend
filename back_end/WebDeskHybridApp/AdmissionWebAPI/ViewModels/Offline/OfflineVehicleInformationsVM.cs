using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineVehicleInformationsVM:CommonProps
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long StudentAdmissionId { get; set; }

        [Required(ErrorMessage = "Enter The Name..")]
        [RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid VehicleType")]
        public string VehicleType { get; set; } = null!;

        [Required(ErrorMessage = "Enter The No of Vehicle..")]
        public byte NoOfVehicle { get; set; }
        public string? VehicleNo { get; set; }
        public string? VehicleInsurancePolicyNo { get; set; }
        public bool? Puc { get; set; }
        public string? Rc { get; set; }
        public DateTime? Rcvalidity { get; set; }
        public string? VehicleOwnerName { get; set; }
        public DateTime? ValidityOfLicence { get; set; }
        public string? EngineNo { get; set; }
        public string? DrivingLicence { get; set; }
        public string? ChassisNo { get; set; }
        public string? VehicleRegistrationNo { get; set; }
    }
}

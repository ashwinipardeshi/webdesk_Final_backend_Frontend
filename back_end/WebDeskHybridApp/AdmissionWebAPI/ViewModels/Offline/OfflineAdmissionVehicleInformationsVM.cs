namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineAdmissionVehicleInformationsVM
    {
        public long StudentAdmissionId { get; set; }
        public long UserId { get; set; }
        public virtual IList<OfflineVehicleInformationsVM>? offlineVehicleInformationsVMList { get; set; }
    }
}

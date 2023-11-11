namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineAdmissionInsuranceDetailsVM
    {
        public long StudentAdmissionId { get; set; }
        public long UserId { get; set; }
        public virtual IList<OfflineInsuranceDetailsVM>? offlineInsuranceDetailsVMList { get; set; }
    }
}

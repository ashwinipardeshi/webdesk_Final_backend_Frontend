namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineAdmissionParentDetailsVM
    {
        public long StudentAdmissionId { get; set; }
        public long UserId { get; set; }       
        public virtual IList<OfflineParentDetailsVM>? offlineParentDetailsVMList { get; set; }
    }
}

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineAdmissionBankDetailsVM
    {
        public long StudentAdmissionId { get; set; }
        public long UserId { get; set; }  
        public virtual IList<OfflineBankDetailsVM> offlineBankDetailsVMList { get; set; } = new List<OfflineBankDetailsVM>();
    }
}

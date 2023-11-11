namespace AdmissionWebAPI.ViewModels.Online
{
    public class OnlineAdmissionBankDetailsVM
    {     
        public long OnlineStudentAdmissionId { get; set; }
        public long OnlineUserId { get; set; }
        public virtual IList<OnlineBankDetailsVM> onlineBankDetailsVMList { get; set; } = new List<OnlineBankDetailsVM>();
    }
}

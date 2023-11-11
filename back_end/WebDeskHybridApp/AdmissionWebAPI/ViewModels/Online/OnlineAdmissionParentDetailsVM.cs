namespace AdmissionWebAPI.ViewModels.Online
{
    public class OnlineAdmissionParentDetailsVM
    {
        public long OnlineUserId { get; set; }
        public long OnlineStudentAdmissionId { get; set; }       
        public virtual IList<OnlineParentDetailsVM> onlineParentDetailsVMList { get; set; } = new List<OnlineParentDetailsVM>();
    }
}

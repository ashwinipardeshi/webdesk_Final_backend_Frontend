

namespace AdmissionWebAPI.ViewModels.Online
{
    public class OnlineStudentAdmissionODataVM 
    {
        public long? SubmittedCnt { get; set; }
        public long? RejectedCnt { get; set; }
        public long? ConfirmedCnt { get; set; }
        public long? InCompletedCnt { get; set; }

       // public virtual IList<OnlineStudentAdmission> onlineStudentAdmissionVMList { get; set; } = new List<OnlineStudentAdmission>();
    }
}

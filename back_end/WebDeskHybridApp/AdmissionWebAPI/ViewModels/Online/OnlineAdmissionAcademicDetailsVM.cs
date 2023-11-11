namespace AdmissionWebAPI.ViewModels.Online
{
    public class OnlineAdmissionAcademicDetailsVM
    {       
        public long OnlineStudentAdmissionId { get; set; }
        public long OnlineUserId { get; set; }
        public virtual IList<OnlinePreviousAcademicDetailsVM> onlinePreviousAcademicDetailsVMList { get; set; } = new List<OnlinePreviousAcademicDetailsVM>();
        public virtual IList<OnlineHscmarkDetailVM> onlineHscmarkDetailsVMList { get; set; } = new List<OnlineHscmarkDetailVM>();
        public virtual IList<OnlineEntranceExamDetailsVM> onlineEntranceExamDetailsVMList { get; set; } = new List<OnlineEntranceExamDetailsVM>();
    }
}

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineAdmissionAcademicDetailsVM
    {
        public long StudentAdmissionId { get; set; }
        public long UserId { get; set; }       
        public virtual IList<OfflinePreviousAcademicDetailsVM> offlinePreviousAcademicDetailsVMList { get; set; } = new List<OfflinePreviousAcademicDetailsVM>();
        public virtual IList<OfflineHscmarkDetailVM> offlineHscmarkDetailsVMList { get; set; } =new List<OfflineHscmarkDetailVM>();
        public virtual IList<OfflineEntranceExamDetailsVM> offlineEntranceExamDetailsVMList { get; set; } = new List<OfflineEntranceExamDetailsVM>();
    }
}

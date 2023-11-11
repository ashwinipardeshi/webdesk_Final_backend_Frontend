namespace AdmissionWebAPI.ViewModels.Online
{
    public class OnlineAdmissionDocumentListsVM
    {       
        public long OnlineStudentAdmissionId { get; set; }
        public long OnlineUserId { get; set; }     
        public virtual IList<OnlineDocumentListVM> OnlineDocumentListVMList { get; set; } = new List<OnlineDocumentListVM>();
    }
}

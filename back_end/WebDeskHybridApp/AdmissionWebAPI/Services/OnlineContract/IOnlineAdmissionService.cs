using AdmissionWebAPI.ViewModels.Online;

namespace AdmissionWebAPI.Services.OnlineContract
{
    public interface IOnlineAdmissionService
    {
        Task<OnlineAdmissionVM?> Get(long onlineUserId);
        Task<long?> Insert(OnlineAdmissionStudentDetailsVM onlineAdmissionStudentDetailsVM);
        Task<bool?> UpsertonlineAdmissionStudent(OnlineAdmissionStudentDetailsVM onlineAdmissionStudentDetailsVM);
        Task<bool?> UpsertonlineAdmissionParent(OnlineAdmissionParentDetailsVM onlineAdmissionParentDetailsVM);
        Task<bool?> UpsertonlineAdmissionCommunication(OnlineAdmissionCommunicationDetailsVM onlineAdmissionCommunicationDetailsVM);
        Task<bool?> UpsertonlineAdmissionAcademic(OnlineAdmissionAcademicDetailsVM onlineAdmissionAcademicDetailsVM);
        Task<bool?> UpsertonlineAdmissionBank(OnlineAdmissionBankDetailsVM onlineAdmissionBankDetailsVM);
    }
}

using AdmissionWebAPI.ViewModels.Offline;
using AdmissionWebAPI.ViewModels.Online;

namespace AdmissionWebAPI.Services.OfflineContract
{
    public interface IOnlineAdmissionConfirmationService
    {
        Task<OnlineAdmissionVM?> Get(long onlineStudentAdmissionId);
        Task<long?> AdmissionAccept(OnlineAdmissionConfirmationVM onlineAdmissionConfirmationVM);       
        Task<bool?> AdmissionReject(OnlineAdmissionConfirmationVM onlineAdmissionConfirmationVM);
        Task<bool?> AdmissionStatusUpdate(OnlineAdmissionConfirmationVM onlineAdmissionConfirmationVM);
    }
}

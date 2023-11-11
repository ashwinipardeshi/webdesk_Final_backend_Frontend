using AdmissionWebAPI.ViewModels.Online;

namespace AdmissionWebAPI.Services.OnlineContract
{
    public interface IOnlineOdataCountAdmissionService
    {
         Task<OnlineStudentAdmissionODataVM?> GetStudentDetailsCount();
    }
}

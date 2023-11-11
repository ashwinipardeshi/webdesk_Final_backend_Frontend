using AdmissionWebAPI.ViewModels.Online;

namespace AdmissionWebAPI.Services.OnlineContract
{
    public interface IOnlineOdataAdmissionService
    {
        Task<IEnumerable<OnlineAdmissionODataVM>> GetStudentDetails();        
    }
}

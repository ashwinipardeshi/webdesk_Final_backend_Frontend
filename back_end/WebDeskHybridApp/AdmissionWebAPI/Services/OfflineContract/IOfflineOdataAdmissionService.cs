using AdmissionWebAPI.ViewModels.Offline;

namespace AdmissionWebAPI.Services.OfflineContract
{
    public interface IOfflineOdataAdmissionService
    {
        Task<IEnumerable<OfflineAdmissionOdataVM>> GetStudentDetails();
    }
}

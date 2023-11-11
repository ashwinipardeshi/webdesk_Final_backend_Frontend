using AdmissionWebAPI.ViewModels.Offline;

namespace AdmissionWebAPI.Services.OfflineContract
{
    public interface IOfflineAdmissionService
    {
        Task<OfflineAdmissionVM?> Get(long userId);
        Task<long?> Insert(OfflineCommonStudentInsertVM offlineCommonStudentVM);
        Task<bool?> UpsertofflineAdmissionProgram(OfflineCommonVM offlineCommonVM);
        Task<bool?> UpsertofflineAdmissionStudent(OfflineAdmissionStudentDetailsVM offlineStudentAdmissionVM);
        Task<bool?> UpsertofflineAdmissionCommunication(OfflineAdmissionCommunicationDetailsVM offlineCommunicationDetailsVM);
        Task<bool?> UpsertofflineAdmissionParent(OfflineAdmissionParentDetailsVM offlineParentDetailsVM);
        Task<bool?> UpsertofflineAdmissionAcademic(OfflineAdmissionAcademicDetailsVM offlineAdmissionAcademicDetailsVM);
        Task<bool?> UpsertOfflineAdmissionBank(OfflineAdmissionBankDetailsVM offlineAdmissionBankDetailsVM);
        Task<bool?> UpsertOfflineAdmissionInsurance(OfflineAdmissionInsuranceDetailsVM offlineAdmissionInsuranceDetailsVM);
        Task<bool?> UpsertofflineAdmissionVehical(OfflineAdmissionVehicleInformationsVM offlineAdmissionVehicleInformationVM);
    }
}

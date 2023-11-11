using Authenticate.ViewModels;

namespace Authenticate.Services.Contract
{
    public interface IApprovedOfflineUserService
    {
        public Task<long?> ApproveOfflineUser(OfflineAdmissionApproveDataVM offlineAdmissionApproveDataVM);
    }
}

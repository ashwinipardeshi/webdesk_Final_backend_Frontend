using Authenticate.ViewModels;

namespace Authenticate.Services.Contract
{
    public interface IApprovedUserService
    {
        public Task<long?> ApproveOnlineUser(OnlineAdmissionAcceptDataVM onlineAdmissionAcceptDataVM);
    }
}

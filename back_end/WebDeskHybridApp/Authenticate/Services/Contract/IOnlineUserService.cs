using Authenticate.ViewModels;

namespace Authenticate.Services.Contract
{
    public interface IOnlineUserService
    {    
        Task<long?> SignUP(OnlineUserVM onlineUserVM);
        Task<bool?> OnlineUserProfile(OnlineUserVM onlineUserVM);
    }
}

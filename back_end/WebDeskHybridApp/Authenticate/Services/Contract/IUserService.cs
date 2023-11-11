using Authenticate.ViewModels;

namespace Authenticate.Services.Contract
{
    public interface IUserService
    {
        Task<LoginVM?> Login(SignInVM signInVM);
        Task<bool?> Logout(long userId, string ipaddress);
        Task<long?> Insert(UserVM userVM);
        Task<bool?> ChangePassword(ChangePasswordVM changePasswordVM);
        Task<bool?> ChangeForgotPassword(ChangeForgotPasswordVM changeForgotPasswordVM);
        Task<bool?> ForgotPassword(string emailId);
        Task<bool?> UserProfileUpdate(UserVM userVM);
    }
}

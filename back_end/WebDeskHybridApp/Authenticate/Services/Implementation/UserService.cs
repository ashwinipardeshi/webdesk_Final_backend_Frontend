using Authenticate.Data;
using Authenticate.Filters.PasswordHasherFilters;
using Authenticate.Models;
using Authenticate.Services.Contract;
using Authenticate.Utility;
using Authenticate.ViewModels;
using CommonApp.Services.Contract;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authenticate.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly AuthenticationDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITokenService _tokenService;
        protected readonly IConfiguration _configuration;
        protected readonly IRoleMenuService _roleMenuService;
        protected readonly IEmailService _emailService;

        public UserService(AuthenticationDevFinalDbContext context, ITokenService tokenService, IConfiguration configuration, IRoleMenuService roleMenuService, IEmailService emailService)
        {
            _context = context;
            _tokenService = tokenService;
            _configuration = configuration;
            _roleMenuService = roleMenuService;
            _emailService = emailService;
        }

        #region Login
        /// <summary>
        /// Login
        /// </summary>
        /// <param name="signInVM"></param>
        /// <returns></returns>
        public async Task<LoginVM?> Login(SignInVM signInVM)
        {
            bool userFlag = false;
            var userRes = await _context.UserMasters.Where(u => u.EmailId == signInVM.EmailId && u.IsActive == true && u.IsDeleted == false).FirstOrDefaultAsync();
            if (userRes != null)
            {
                //Password Hasher 
                PasswordHasher<SignInVM> passwordHasher = new PasswordHasher<SignInVM>();
                var res = passwordHasher.VerifyHashedPassword(signInVM, userRes.Password, signInVM.Password);
                if (res.ToString().ToLower().Equals("success"))
                {
                    userFlag = true;                   
                    //New JWT Token Code
                    var builder = WebApplication.CreateBuilder();
                    var jwtToken = _tokenService.BuildToken(builder.Configuration["Jwt:Key"], builder.Configuration["Jwt:Issuer"],
                    new[]
                    {
                        builder.Configuration["Jwt:Aud1"],
                        builder.Configuration["Jwt:Aud2"]
                    },
                    new ClaimVM() { CollegeId = userRes.CollegeId, Id = userRes.Id, RoleId = userRes.RoleId, ipAddress = signInVM.IPAddress, AcademicYearId = userRes.AcademicYearId});

                    // Dynamic Menu
                    var roleMenus = await _roleMenuService.GetRoleMenus(userRes.RoleId);

                    // User Login ActivitLog
                    await AuthenticationCommonActivity.LoginActivityLog(_context, userRes.Id, signInVM.IPAddress);

                    return new LoginVM()
                    {
                        Id = userRes.Id,
                        RoleId = userRes.RoleId,
                        CollegeId = userRes.CollegeId,
                        AcademicYearId = userRes.AcademicYearId,
                        DepartmentId = userRes.DepartmentId,
                        Name = userRes.Name,
                        Mobile = userRes.Mobile,
                        EmailId = userRes.EmailId,
                        Token = jwtToken,
                        DynamicMenu = roleMenus,
                        IsUserMaster = true
                    };
                }
            }
            if (!userFlag)
            {
                var onlineUserRes = await _context.OnlineUsers.Where(u => u.EmailId == signInVM.EmailId && u.IsActive == true && u.IsDeleted == false).FirstOrDefaultAsync();
                if (onlineUserRes != null)
                {
                    //Password Hasher 
                    PasswordHasher<SignInVM> passwordHasher = new PasswordHasher<SignInVM>();
                    var res = passwordHasher.VerifyHashedPassword(signInVM, onlineUserRes.Password, signInVM.Password);
                    if (res.ToString().ToLower().Equals("success"))
                    {
                      
                        //New JWT Token Code
                        var builder = WebApplication.CreateBuilder();
                        var jwtToken = _tokenService.BuildToken(builder.Configuration["Jwt:Key"], builder.Configuration["Jwt:Issuer"],
                        new[]
                        {
                            builder.Configuration["Jwt:Aud1"],
                            builder.Configuration["Jwt:Aud2"]
                        },
                        new ClaimVM() { CollegeId = onlineUserRes.CollegeId, Id = onlineUserRes.Id, RoleId = onlineUserRes.RoleId, ipAddress = signInVM.IPAddress, AcademicYearId = onlineUserRes.AcademicYearId });

                        // Dynamic Menu
                        var roleMenus = await _roleMenuService.GetRoleMenus(onlineUserRes.RoleId);

                        return new LoginVM()
                        {
                            Id = onlineUserRes.Id,
                            RoleId = onlineUserRes.RoleId,
                            CollegeId = onlineUserRes.CollegeId,
                            AcademicYearId = onlineUserRes.AcademicYearId,
                            DepartmentId = onlineUserRes.DepartmentId,
                            Name = onlineUserRes.Name,
                            Mobile = onlineUserRes.Mobile,
                            EmailId = onlineUserRes.EmailId,
                            Token = jwtToken,
                            DynamicMenu = roleMenus,
                            IsUserMaster = false
                        };
                    }
                }
            }
            return null;
        }
        #endregion Login

        #region Logout
        public async Task<bool?> Logout(long userId, string ipaddress)
        {
            return await AuthenticationCommonActivity.LogoutActivityLog(_context, userId, ipaddress);
        }
        #endregion Logout

        #region Insert
        /// <summary>
        /// InsertLogin
        /// </summary>
        /// <param name="userVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(UserVM userVM)
        {
            var userRes = await _context.UserMasters.Where(u => u.EmailId == userVM.EmailId.Trim() || u.Mobile == userVM.Mobile).FirstOrDefaultAsync();
            if (userRes == null)
            {
                //Password Hasher 
                PasswordHasher<UserVM> passwordHasher = new PasswordHasher<UserVM>();
                //await _context.Users.AddAsync(new User()
                EntityEntry<UserMaster> created = await _context.UserMasters.AddAsync(new UserMaster()
                {
                    EmailId = userVM.EmailId,
                    Password = passwordHasher.HashPassword(userVM, userVM.Password),
                    RoleId = userVM.RoleId,
                    CollegeId = userVM.CollegeId,
                    DepartmentId = userVM.DepartmentId,
                    AcademicYearId = userVM.AcademicYearId,
                    Mobile = userVM.Mobile,
                    Name = userVM.Name,
                    IsActive = true,
                    IsDeleted = false,
                    CreatedBy = 1,
                    CreatedDate = DateTime.UtcNow,
                });
                if (_context.SaveChanges() > 0)
                {
                    // ToDo - Email Activation link should be send
                    string ebody = $"<h1>Dear {userVM.Name}</h1>\r\n<p>Welcome to WebDeskERP ABC College</p>\r\n<p>Your Credentails</p>\r\n<p>Email: {userVM.EmailId}</p>\r\n<p>Password: {userVM.Password}</p>";
                    await _emailService.sendMail(userVM.EmailId, "WebDeskERP - Offline User Resgirstion Credentails", ebody);
                    return created.Entity.Id;
                }
            }
            else
                return 0;
            return null;
        }
        #endregion Insert

        #region ChangePassword
        /// <summary>
        /// changePasswordVM
        /// </summary>
        /// <param name="changePasswordVM"></param>
        /// <returns></returns>
        public async Task<bool?> ChangePassword(ChangePasswordVM changePasswordVM)
        {
            var user = await _context.UserMasters.FirstOrDefaultAsync(e => e.Id == changePasswordVM.userId && e.IsActive == true && e.IsDeleted == false);
            if (user != null)
            {
                PasswordHasher<ChangePasswordVM> passwordHasher = new PasswordHasher<ChangePasswordVM>();
                var isSuccess = passwordHasher.VerifyHashedPassword(changePasswordVM, user.Password, changePasswordVM.Password);


                if (isSuccess == PasswordVerificationResult.Success)
                {
                    //Create Hashsalt password                   
                    user.Password = passwordHasher.HashPassword(changePasswordVM, changePasswordVM.NewPassword);
                    _context.Entry(user).State = EntityState.Modified;
                    try
                    {
                        if (_context.SaveChanges() > 0)
                            return true;
                    }
                    catch (DbUpdateConcurrencyException err)
                    {
                        Console.WriteLine(err.ToString());
                    }
                }
            }
            return null;
        }
        #endregion ChangePassword

        #region ChangeForgotPassword
        /// <summary>
        /// ChangeForgotPassword
        /// </summary>
        /// <param name="changeForgotPasswordVM"></param>
        /// <returns></returns>
        public async Task<bool?> ChangeForgotPassword(ChangeForgotPasswordVM changeForgotPasswordVM)
        {
            // decript changeForgotPasswordVM.UserId
            var user = await _context.UserMasters.FirstOrDefaultAsync(cp => cp.Id == changeForgotPasswordVM.UserId && cp.IsActive == true && cp.IsDeleted == false && cp.ChangeForgotPasswordFlag == true);
            if (user != null)
            {
                PasswordHasher<ChangeForgotPasswordVM> passwordHasher = new PasswordHasher<ChangeForgotPasswordVM>();
                //Create Hashsalt password                   
                user.Password = passwordHasher.HashPassword(changeForgotPasswordVM, changeForgotPasswordVM.NewPassword);
                user.ChangeForgotPasswordFlag = false;
                _context.Entry(user).State = EntityState.Modified;
            }
            try
            {
                if (_context.SaveChanges() > 0)
                    return true;
            }
            catch (DbUpdateConcurrencyException err)
            {
                Console.WriteLine(err.ToString());
            }
            return null;
        }
        #endregion ChangeForgotPassword

        #region ForgotPassword
        /// <summary>
        /// ForgotPassword
        /// </summary>
        /// <param name="emailId"></param>
        /// <returns></returns>
        public async Task<bool?> ForgotPassword(string emailId)
        {
            var validMail = await _context.UserMasters.FirstOrDefaultAsync(fp => fp.EmailId == emailId && fp.IsActive == true && fp.IsDeleted == false);
            if (validMail != null)
            {
                long userId = validMail.Id;
                string ebody = $"<h3>\r\n<p>Please click on below link Below to reset your password\r\n</p></h3>";
                string URL = StaticConfigurationManager.AppSetting["ForgotPasswordURL:URL"];
                string resetLink = $"{ebody}'<a target= '_blank' href='{URL}/{validMail.Id}'>{URL}/{validMail.Id}</a>'";
                var isSent = await _emailService.sendMail(validMail.EmailId, "WebDeskERP - Password Reset Link ", resetLink);
                if (isSent == true)
                {
                    validMail.ChangeForgotPasswordFlag = true;
                    await _context.SaveChangesAsync();
                }
                return true;
            }
            return null;
        }
        #endregion ForgotPassword

        #region UserProfileUpdate
        /// <summary>
        /// UserProfileUpdate
        /// </summary>
        /// <param name="userVM"></param>
        /// <returns></returns>
        public async Task<bool?> UserProfileUpdate(UserVM userVM)
        {
            //Password Hasher 
            Filters.PasswordHasherFilters.PasswordHasher<UserVM> passwordHasher = new Filters.PasswordHasherFilters.PasswordHasher<UserVM>();
            userVM.Password = passwordHasher.HashPassword(userVM, userVM.Password);

            var userProfileUpdate = await _context.UserMasters.FirstOrDefaultAsync(up => up.Id == userVM.Id);
            if (userProfileUpdate != null)
            {
                userProfileUpdate.RoleId = userVM.RoleId;
                userProfileUpdate.CollegeId = userVM.CollegeId;
                userProfileUpdate.DepartmentId = userVM.DepartmentId;
                userProfileUpdate.EmailId = userVM.EmailId;
                userProfileUpdate.Password = userVM.Password;
                userProfileUpdate.AcademicYearId = userVM.AcademicYearId;
                userProfileUpdate.Mobile = userVM.Mobile;
                userProfileUpdate.Name = userVM.Name;
                userProfileUpdate.IsActive = true;
                userProfileUpdate.IsDeleted = false;
                userProfileUpdate.CreatedDate = DateTime.UtcNow;
            }
            _context.Entry(userProfileUpdate).State = EntityState.Modified;
            try
            {
                if (_context.SaveChanges() > 0)
                    return true;
            }
            catch (DbUpdateConcurrencyException err)
            {
                Console.WriteLine(err.ToString());
            }
            return null;
        }
        #endregion UserProfileUpdate
    }
}
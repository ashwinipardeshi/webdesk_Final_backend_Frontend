using Authenticate.Data;
using Authenticate.Filters.PasswordHasherFilters;
using Authenticate.Models;
using Authenticate.Services.Contract;
using Authenticate.ViewModels;
using CommonApp.Services.Contract;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Authenticate.Services.Implementation
{
    public class OnlineUserService : IOnlineUserService
    {
        private readonly AuthenticationDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITokenService _tokenService;
        protected readonly IConfiguration _configuration;
        protected readonly IEmailService _emailService;
        
        public OnlineUserService(AuthenticationDevFinalDbContext context, ITokenService tokenService, IConfiguration configuration, IEmailService emailService)
        {
            _context = context;
            _tokenService = tokenService;
            _configuration = configuration;
            _emailService = emailService;
            
        }

        #region SignUP
        /// <summary>
        /// SignUP
        /// </summary>
        /// <param name="onlineUserVM"></param>
        /// <returns></returns>
        public async Task<long?> SignUP(OnlineUserVM onlineUserVM)
        {
            var userExist = await _context.OnlineUsers.AnyAsync(u => u.EmailId == onlineUserVM.EmailId.Trim() || u.Mobile ==onlineUserVM.Mobile );
            if (userExist == true)
                return null;
            //Password Hasher 
            // Filters.PasswordHasherFilters.PasswordHasher<OnlineUserVM> passwordHasher = new Filters.PasswordHasherFilters.PasswordHasher<OnlineUserVM>();
            PasswordHasher<OnlineUserVM> passwordHasher = new PasswordHasher<OnlineUserVM>();
            EntityEntry<OnlineUser> created = await _context.OnlineUsers.AddAsync(new OnlineUser()
            {
                RoleId = onlineUserVM.RoleId,
                CollegeId = onlineUserVM.CollegeId,
                DepartmentId = onlineUserVM.DepartmentId,
                AcademicYearId = onlineUserVM.AcademicYearId,
                Name = onlineUserVM.Name,
                EmailId = onlineUserVM.EmailId,
                Password = passwordHasher.HashPassword(onlineUserVM, onlineUserVM.Password),
                Mobile = onlineUserVM.Mobile,
                IsActive = true,
                IsDeleted = false,             
                CreatedDate = DateTime.UtcNow,
            });
            if (_context.SaveChanges() > 0)
            {
                // ToDo - Email Activation link should be send
                string ebody = $"<h1>Dear {onlineUserVM.Name}</h1>\r\n<p>Welcome to WebDeskERP ABC College</p>\r\n<p>Your Credentails</p>\r\n<p>Email: {onlineUserVM.EmailId}</p>\r\n<p>Password: {onlineUserVM.Password}</p>";
                await _emailService.sendMail(onlineUserVM.EmailId, "WebDeskERP - Online User Resgirstion Credentails", ebody);
                return created.Entity.Id;
            }
            return null;
        }
        #endregion SignUP

        #region OnlineUserProfile
        /// <summary>
        /// OnlineUserProfile
        /// </summary>
        /// <param name="onlineUserVM"></param>
        /// <returns></returns>
        public async Task<bool?> OnlineUserProfile(OnlineUserVM onlineUserVM)
        {
            //Password Hasher 
            Filters.PasswordHasherFilters.PasswordHasher<OnlineUserVM> passwordHasher = new Filters.PasswordHasherFilters.PasswordHasher<OnlineUserVM>();
            onlineUserVM.Password = passwordHasher.HashPassword(onlineUserVM, onlineUserVM.Password);

            //await _context.OnlineUsers.UpdateAsync(new OnlineUsers()
            var onlineUsers = await _context.OnlineUsers.FirstOrDefaultAsync(e => e.Id == onlineUserVM.Id);
            if (onlineUsers != null)
            {
                onlineUsers.RoleId = onlineUserVM.RoleId;
                onlineUsers.CollegeId = onlineUserVM.CollegeId;
                onlineUsers.DepartmentId = onlineUserVM.DepartmentId;
                onlineUsers.AcademicYearId = onlineUserVM.AcademicYearId;
                onlineUsers.Name = onlineUserVM.Name;
                onlineUsers.EmailId = onlineUserVM.EmailId;
                onlineUsers.Password = onlineUserVM.Password;
                onlineUsers.Mobile = onlineUserVM.Mobile;
                onlineUsers.IsActive = true;
                onlineUsers.IsDeleted = false;
                onlineUsers.CreatedDate = DateTime.UtcNow;
            }
            _context.Entry(onlineUsers).State = EntityState.Modified;
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
        #endregion OnlineUserProfile
    }
}

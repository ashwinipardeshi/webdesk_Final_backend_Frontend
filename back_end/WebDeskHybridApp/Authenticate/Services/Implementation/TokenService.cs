using Authenticate.Services.Contract;
using Authenticate.ViewModels;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authenticate.Services.Implementation
{
    public class TokenService : ITokenService
    {
        private TimeSpan ExpiryDuration = new TimeSpan(24, 0, 0);
        public string BuildToken(string key, string issuer, IEnumerable<string> audience, ClaimVM claimVM)
        {
            var claims = new List<Claim>
            {
                 new Claim("CollegeId", claimVM.CollegeId.ToString()),
                 new Claim("UserId", claimVM.Id.ToString()),
                 new Claim("RoleId", claimVM.RoleId.ToString()),
                 new Claim("AcademicYearId", claimVM.AcademicYearId.ToString()),
                 new Claim("IPAddress", claimVM.ipAddress)
            };

            claims.AddRange(audience.Select(aud => new Claim(JwtRegisteredClaimNames.Aud, aud)));

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new JwtSecurityToken(issuer, issuer, claims,
                expires: DateTime.Now.Add(ExpiryDuration), signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}

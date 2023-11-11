using Authenticate.ViewModels;

namespace Authenticate.Services.Contract
{
    public interface ITokenService
    {
        string BuildToken(string key, string issuer, IEnumerable<string> audience, ClaimVM claimVM);
    }
}

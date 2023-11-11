using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface ISMTPConfigService
    {
        Task<IEnumerable<SMTPConfigMasterVM?>> GetAll(long collegeId);
        Task<SMTPConfigMasterVM?> Get(long id);
        Task<long?> Insert(SMTPConfigMasterVM smtpConfigMasterVM);
        Task<bool?> Update(SMTPConfigMasterVM smtpConfigMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}


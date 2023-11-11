using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface ISMSTemplateService
    {
        Task<IEnumerable<SMSTemplateMasterVM?>> GetAll(long collegeId);
        Task<SMSTemplateMasterVM?> Get(long id);
        Task<long?> Insert(SMSTemplateMasterVM smsTemplateMasterVM);
        Task<bool?> Update(SMSTemplateMasterVM smsTemplateMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}


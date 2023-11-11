using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IFeeHeadTypeService
    {
        Task<IEnumerable<FeeHeadTypeMasterVM?>> GetAll(long collegeId);
        Task<FeeHeadTypeMasterVM?> Get(long id);
        Task<long?> Insert(FeeHeadTypeMasterVM feeHeadTypeMasterVM);
        Task<bool?> Update(FeeHeadTypeMasterVM feeHeadTypeMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}

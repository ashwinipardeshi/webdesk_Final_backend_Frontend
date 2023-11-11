using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IFeeHeadService
    {
        Task<IEnumerable<FeeHeadMasterVM?>> GetAll(long collegeId,long feeHeadTypeMasterId);
        Task<FeeHeadMasterVM?> Get(long id);
        Task<long?> Insert(FeeHeadMasterVM feeHeadMasterVM);
        Task<bool?> Update(FeeHeadMasterVM feeHeadMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId, long feeHeadTypeMasterId);
    }
}

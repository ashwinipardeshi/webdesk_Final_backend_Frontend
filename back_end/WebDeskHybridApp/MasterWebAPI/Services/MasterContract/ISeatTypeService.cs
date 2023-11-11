using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface ISeatTypeService
    {
        Task<IEnumerable<SeatTypeMasterVM?>> GetAll(long collegeId);
        Task<SeatTypeMasterVM?> Get(long id);
        Task<long?> Insert(SeatTypeMasterVM seatTypeMasterVM);
        Task<bool?> Update(SeatTypeMasterVM seatTypeMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}

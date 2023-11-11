using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IReservationCategoryService
    {
        Task<IEnumerable<ReservationCategoryMasterVM?>> GetAll(long collegeId);
        Task<ReservationCategoryMasterVM?> Get(long id);
        Task<long?> Insert(ReservationCategoryMasterVM reservationCategoryMasterVM);
        Task<bool?> Update(ReservationCategoryMasterVM reservationCategoryMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}

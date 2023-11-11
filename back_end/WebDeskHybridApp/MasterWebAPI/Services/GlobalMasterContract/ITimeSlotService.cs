using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface ITimeSlotService
    {
         Task<IEnumerable<TimeSlotGMasterVM?>> GetAll();
         Task<TimeSlotGMasterVM?> Get(long id);
         Task<long?> Insert(TimeSlotGMasterVM timeSlotGmasterVM);
         Task<bool?> Update(TimeSlotGMasterVM timeSlotGmasterVM);
         Task<bool?> Delete(long id);
         Task<IEnumerable<OptionVM?>> GetOptions();
    }
}

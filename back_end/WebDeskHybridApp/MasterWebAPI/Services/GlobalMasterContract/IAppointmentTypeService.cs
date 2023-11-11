using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface IAppointmentTypeService
    {
         Task<IEnumerable<AppointmentTypeGMasterVM?>> GetAll();
         Task<AppointmentTypeGMasterVM?> Get(long id);
         Task<long?> Insert(AppointmentTypeGMasterVM appointmentTypeGmasterVM);
         Task<bool?> Update(AppointmentTypeGMasterVM appointmentTypeGmasterVM);
         Task<bool?> Delete(long id);
         Task<IEnumerable<OptionVM?>> GetOptions();
    }
}

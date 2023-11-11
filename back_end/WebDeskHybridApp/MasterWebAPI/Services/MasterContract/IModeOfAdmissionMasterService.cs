using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IModeOfAdmissionMasterService
    {
        Task<IEnumerable<ModeOfAdmissionMasterVM?>> GetAll(long collegeId);
        Task<ModeOfAdmissionMasterVM?> Get(long id);
        Task<long?> Insert(ModeOfAdmissionMasterVM modeOfAdmissionMasterVM);
        Task<bool?> Update(ModeOfAdmissionMasterVM modeOfAdmissionMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId); 
    }
}

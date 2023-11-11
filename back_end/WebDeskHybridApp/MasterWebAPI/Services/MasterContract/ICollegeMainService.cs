using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface ICollegeMainService
    {
        public Task<long?> Insert(CollegeMasterVM collegeMainMasterVM);
    }
}

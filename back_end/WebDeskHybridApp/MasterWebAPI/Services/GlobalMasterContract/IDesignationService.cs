using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.Contract
{
    public interface IDesignationService
    {
        public Task<IList<DesignationMasterVM>> GetAllDesignation();
        public Task<IList<DesignationMasterVM>> DesignationList();
        public Task<DesignationMasterVM> GetSpecificDesignation(long id);
        public Task<bool> InsertDesignation(DesignationMasterVM designationMasterVM);
        public Task<bool> UpdateDesignation(DesignationMasterVM designationMasterVM);
        public Task<bool> DeleteDesignation(long id, long uid);
    }
}

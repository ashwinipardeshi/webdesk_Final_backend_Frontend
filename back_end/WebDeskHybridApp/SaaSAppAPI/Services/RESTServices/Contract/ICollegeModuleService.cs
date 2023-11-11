using SaaSAppAPI.ViewModels;

namespace SaaSAppAPI.Services.RESTServices.Contract
{
    public interface ICollegeModuleService
    {
        Task<IEnumerable<CollegeModuleVM?>> GetAll();
        Task<CollegeModuleVM?> Get(long id);
        Task<long?> Insert(CollegeModuleVM collegeModuleVM);
        Task<bool?> Update(CollegeModuleVM collegeModuleVM);
        Task<bool?> Delete(long id);
    }
}


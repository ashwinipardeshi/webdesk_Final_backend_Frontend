using SaaSAppAPI.ViewModels;

namespace SaaSAppAPI.Services.RESTServices.Contract
{
    public interface ICollegeMainMasterService
    {
        Task<IEnumerable<CollegeMainMasterVM>> GetAll();
        Task<CollegeMainMasterVM?> Get(long id);

        //Task<long?> Insert(CommonCollegeVM commonCollegeVM);

        Task<long?> Insert(CommonMainCollegeMasterVM commonMainCollegeMasterVM);
        Task<bool?> Update(CollegeMainMasterVM moduleMasterGraphVM);
        Task<bool?> Delete(long id);
       
    }
}

using SaaSAppAPI.ViewModels;
namespace SaaSAppAPI.Services.RESTServices.Contract
{
    public interface ICollegeSubscriptionService
    {
        Task<IEnumerable<CollegeSubscriptionVM?>> GetAll();
        Task<CollegeSubscriptionVM?> Get(long id);
        Task<long?> Insert(CollegeSubscriptionVM collegeSubscriptionVM);
        Task<bool?> Update(CollegeSubscriptionVM collegeSubscriptionVM);
        Task<bool?> Delete(long id);
    }
}

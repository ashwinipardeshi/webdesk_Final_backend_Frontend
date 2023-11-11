using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IExamTypeService
    {
        Task<IEnumerable<ExamTypeMasterVM?>> GetAll(long collegeId);
        Task<ExamTypeMasterVM?> Get(long id);
        Task<long?> Insert(ExamTypeMasterVM examTypeMasterVM);
        Task<bool?> Update(ExamTypeMasterVM examTypeMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}

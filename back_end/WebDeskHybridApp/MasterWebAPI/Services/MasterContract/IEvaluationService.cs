using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IEvaluationService
    {
        Task<IEnumerable<EvaluationMasterVM?>> GetAll(long collegeId);
        Task<EvaluationMasterVM?> Get(long id);
        Task<long?> Insert(EvaluationMasterVM evaluationMasterVM);
        Task<bool?> Update(EvaluationMasterVM evaluationMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}


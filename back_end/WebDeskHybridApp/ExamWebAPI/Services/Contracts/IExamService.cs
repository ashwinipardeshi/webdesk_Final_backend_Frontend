using ExamWebAPI.Models;

namespace ExamWebAPI.Services.Contracts
{
    public interface IExamService
    {
        Task<List<Exam>> GetAllExam();
        Task<Exam> SaveExamAsync(Exam newExam);
        Task<Exam> UpdateExamAsync(Exam updateExam);
        Task<bool?> DeleteExamAsync(int id);
        Task<long> SaveExamNewAsync(Exam newExam);
    }
}

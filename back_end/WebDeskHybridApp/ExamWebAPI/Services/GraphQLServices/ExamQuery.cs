using ExamWebAPI.Models;
using ExamWebAPI.Services.Contracts;

namespace ExamWebAPI.Services.GraphQLServices
{
    public class ExamQuery
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public async Task<List<Exam>> AllExamAsync([Service] IExamService _service)
        {
            return await _service.GetAllExam();
        }

        /*
         query{
                 allExam{
                  id,
                  name,
                  examDate,
                  center,
                  isActive,
                  isDeleted,
                  createdBy,
                  createdDate
                }
              }
         */
    }
}

using ExamWebAPI.Models;
using ExamWebAPI.Services.Contracts;

namespace ExamWebAPI.Data
{
   public class ExamMutation
    {
        public async Task<Exam> SaveExamAsync([Service] IExamService _service, Exam newExam)
        {
            return await _service.SaveExamAsync(newExam);
        }
        /*
         //Operation
         mutation($newExam:ExamInput!){
          saveExam(newExam:$newExam) {
            id
             }
        }
        //Variable
        {
          "newExam":{
            "id": 0,
            "name": "Naaz",
           "examDate": "2023-09-24",
           "center" : "Pune",
            "isActive": true,
            "isDeleted": true,
            "createdBy": 1,
            "createdDate": "2023-09-25",
            "questions": []
          }
        }
         */

        public async Task<Exam> UpdateExamAsync([Service] IExamService _service, Exam updateExam)
        {
            return await _service.UpdateExamAsync(updateExam);
        }

        /*
         //Operation
          mutation($updateExam:ExamInput!){
          updateExam(updateExam: $updateExam) {
            id
            name
          }
        }
        //Variable
          {
            "updateExam":{
            "id": 32,
            "name": "Vijay Test",
            "examDate": "2023-09-24",
            "center" : "Pune",
            "isActive": true,
            "isDeleted": true,
            "createdBy": 1,
            "createdDate": "2023-09-25",
            "questions": []
            }
        }
         */

        public async Task<bool?> DeleteExamAsync([Service] IExamService _service, int id)
        {
            return await _service.DeleteExamAsync(id);
        }

        /*
        //Operation
        mutation($id:Int!){
            deleteExam(id:$id)
        }
       //Variable
        {
          "id":32
        }
        */

        public async Task<long> SaveExamNewAsync([Service] IExamService _service, Exam newExam)
        {
            return await _service.SaveExamNewAsync(newExam);
        }

/* Query
         //Operation
         mutation($newExam:ExamInput!){
saveExamNew(newExam:$newExam)
        }
        //Variable
        {
          "newExam":{
            "id": 0,
            "name": "Naaz",
           "examDate": "2023-10-10",
           "center" : "Pune",
            "isActive": true,
            "isDeleted": true,
            "createdBy": 1,
            "createdDate": "2023-09-25",
            "questions": []
          }
        }
         */
    
    }
}

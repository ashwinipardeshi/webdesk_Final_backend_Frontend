using ExamWebAPI.Data;
using ExamWebAPI.Models;
using ExamWebAPI.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;

namespace ExamWebAPI.Services.Implementations
{
    public class ExamService : IExamService
    {
        private readonly ExamDevFinalDbContext _context;
        public ExamService(ExamDevFinalDbContext context)
        {
            _context = context;
        }

        public async Task<List<Exam>> GetAllExam()
        {
            var res = await _context.Exams.Include(e => e.Questions).ToListAsync();
            return res;
        }

        public async Task<Exam> SaveExamAsync(Exam newExam)
        {
            _context.Exams.Add(newExam);
            await _context.SaveChangesAsync();
            return newExam;
        }

        public async Task<Exam> UpdateExamAsync(Exam updateExam)
        {
            _context.Exams.Update(updateExam);
            await _context.SaveChangesAsync();
            return updateExam;
        }

        public async Task<bool?> DeleteExamAsync(int id)
        {
            var examToDelete = await _context.Exams.FindAsync(id);
            if (examToDelete != null)
            {
                _context.Exams.Remove(examToDelete);
                await _context.SaveChangesAsync();
                return true;
            }
            return null;
        }

        public async Task<long> SaveExamNewAsync(Exam newExam)
        {
            EntityEntry<Exam> created = await _context.Exams.AddAsync(newExam);
            if (await _context.SaveChangesAsync() > 0)
                return created.Entity.Id;
            return 0;
        }
    }
}
using ExamWebAPI.Data;
using ExamWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamWebAPI.Controllers
{
    [Route("restapi/v1.0/[controller]")]
    [ApiController]
    public class ExamTestController : ControllerBase
    {
        private readonly ExamDevFinalDbContext _context;

        public ExamTestController(ExamDevFinalDbContext context)
        {
            _context = context;
        }

        // GET: api/ExamTest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExamTest>>> GetExamTests()
        {
          if (_context.ExamTests == null)
          {
              return NotFound();
          }
            return await _context.ExamTests.ToListAsync();
        }

        // GET: api/ExamTest/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExamTest>> GetExamTest(int id)
        {
          if (_context.ExamTests == null)
          {
              return NotFound();
          }
            var examTest = await _context.ExamTests.FindAsync(id);

            if (examTest == null)
            {
                return NotFound();
            }

            return examTest;
        }

        // PUT: api/ExamTest/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExamTest(int id, ExamTest examTest)
        {
            if (id != examTest.Id)
            {
                return BadRequest();
            }

            _context.Entry(examTest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExamTestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ExamTest
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ExamTest>> PostExamTest(ExamTest examTest)
        {
          if (_context.ExamTests == null)
          {
              return Problem("Entity set 'ExamDevDbContext.ExamTests'  is null.");
          }
            _context.ExamTests.Add(examTest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExamTest", new { id = examTest.Id }, examTest);
        }

        // DELETE: api/ExamTest/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExamTest(int id)
        {
            if (_context.ExamTests == null)
            {
                return NotFound();
            }
            var examTest = await _context.ExamTests.FindAsync(id);
            if (examTest == null)
            {
                return NotFound();
            }

            _context.ExamTests.Remove(examTest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExamTestExists(int id)
        {
            return (_context.ExamTests?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

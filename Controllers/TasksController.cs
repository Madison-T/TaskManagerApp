using Microsoft.AspNetCore.Mvc;
using TaskManagerApp.Data;
using TaskManagerApp.Models;
using Microsoft.EntityFrameworkCore;

namespace TaskManagerApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }
        // Get /tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            var tasks = await _context.Tasks.ToListAsync();
            return Ok(tasks);
        }

        // POST /tasks
        [HttpPost]
        public async Task<ActionResult<TaskItem>> CreateTask(TaskItem task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTaskById), new { id = task.Id }, task);
        }

        // GET /tasks/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTaskById(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        // PUT /tasks/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTask(int id, TaskItem updatedTask)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description;
            task.IsCompleted = updatedTask.IsCompleted;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE /tasks/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            return NoContent();
        }

    }
}
using System;
using System.Collections.Generic;

namespace ExamWebAPI.Models;

public partial class Exam
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public DateTime ExamDate { get; set; }

    public string? Center { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public int CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public int? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
}

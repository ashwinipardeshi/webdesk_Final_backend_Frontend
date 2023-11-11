using System;
using System.Collections.Generic;

namespace ExamWebAPI.Models;

public partial class Question
{
    public int Id { get; set; }

    public int? ExamId { get; set; }

    public string? Question1 { get; set; }

    public string? Option1 { get; set; }

    public string? Option2 { get; set; }

    public string? Option3 { get; set; }

    public string? Option4 { get; set; }

    public string? CorrectAns { get; set; }

    public virtual Exam? Exam { get; set; }
}

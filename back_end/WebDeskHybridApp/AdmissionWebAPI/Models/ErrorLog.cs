using System;
using System.Collections.Generic;

namespace AdmissionWebAPI.Models;

public partial class ErrorLog
{
    public long Id { get; set; }

    public string Controller { get; set; } = null!;

    public string Action { get; set; } = null!;

    public string Message { get; set; } = null!;

    public string StackTrace { get; set; } = null!;

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }
}

﻿using System;
using System.Collections.Generic;

namespace AdmissionWebAPI.Models;

public partial class OnlineDocumentList
{
    public long Id { get; set; }

    public long OnlineStudentAdmissionId { get; set; }

    public long? DocumentId { get; set; }

    public string? DocumentPath { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual OnlineStudentAdmission OnlineStudentAdmission { get; set; } = null!;
}

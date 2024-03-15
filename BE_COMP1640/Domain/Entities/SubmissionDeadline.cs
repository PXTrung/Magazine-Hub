﻿using Domain.Common;

namespace Domain.Entities;

public class SubmissionDeadline : AuditableBaseEntity
{
    public int AcademicYear { get; set; }
    public DateTime FirstSubmissionDeadline { get; set; }
    public DateTime SecondSubmissionDeadline { get; set; }

    public ICollection<Contribution> Contributions { get; set; }
}
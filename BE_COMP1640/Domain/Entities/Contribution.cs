﻿using Domain.Common;
using Domain.Enums;

namespace Domain.Entities;

public class Contribution : AuditableBaseEntity
{
    public string Title { get; set; }
    public string Description { get; set; }
    public ContributionStatus Status { get; set; }

    public ICollection<Feedback> Feedbacks { get; set; } // One-to-many

    public Faculty Faculty { get; set; } // Many-to-one

    public Guid? FacultyId { get; set; } // Foreign key

    public Guid? SubmissionDeadlineId { get; set; }

    public SubmissionDeadline SubmissionDeadline { get; set; } // One-to-one

    public Guid? ImageId { get; set; }

    public Media Image { get; set; }

    public Guid? DocumentId { get; set; }

    public Media Document { get; set; }

}
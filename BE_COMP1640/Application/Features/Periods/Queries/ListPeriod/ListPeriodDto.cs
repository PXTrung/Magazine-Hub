namespace Application.Features.Periods.Queries.ListPeriod;

public class ListPeriodDto
{
    public Guid Id { get; set; }

    public int AcademicYear { get; set; }

    public DateTime FirstSubmissionDeadline { get; set; }

    public DateTime SecondSubmissionDeadline { get; set; }
}
using Domain.Enums;

namespace Application.Features.Dashboards.DTO.AdminDashboardDTO
{
    public class AdminDashboardDataDto
    {
        public IDictionary<string, int> FacultyRankByContribution { get; set; }

        public IDictionary<ContributionStatus, double> PercentageOfContributionByStatus { get; set; }

        public double PercentageOfFeedbackedContribution { get; set; }

        public List<NumberOfContributionByStatusWithinFacultyDto> NumberOfContributionByStatusWithinFaculty { get; set; }
    }


}

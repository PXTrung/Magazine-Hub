using Application.Common.Interfaces;
using Application.Features.Dashboards.DTO.AdminDashboardDTO;
using Domain.Enums;
using ErrorOr;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Dashboards
{
    public class DashboardService : IDashboardService
    {
        private readonly IApplicationDbContext _context;

        public DashboardService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ErrorOr<AdminDashboardDataDto>> GetAdminDashboard(Guid periodId)
        {
            var period = await _context.Periods.FirstOrDefaultAsync(p => p.Id == periodId);

            if (period == null) return Error.NotFound(description: "Period not found");

            var facultyRankByContribution = await AdminFacultyRankByContribution(periodId);
            var percentageOfContributionByStatus = await AdminPercentageOfContributionByStatus(periodId);
            var percentageOfFeedbackedContribution = await AdminPercentageOfFeedbackedContribution(periodId);
            var numberOfContributionByStatusWithinFaculty = await AdminNumberOfContributionByStatusWithinFaculty(periodId);

            var dashboardData = new AdminDashboardDataDto()
            {
                FacultyRankByContribution = facultyRankByContribution,
                PercentageOfContributionByStatus = percentageOfContributionByStatus,
                PercentageOfFeedbackedContribution = percentageOfFeedbackedContribution,
                NumberOfContributionByStatusWithinFaculty = numberOfContributionByStatusWithinFaculty
            };

            return dashboardData;
        }

        private async Task<IDictionary<string, int>> AdminFacultyRankByContribution(Guid periodId)
        {
            var facultyContributions = await _context.Faculties
                .Include(f => f.Members).ThenInclude(u => u.Contributions)
                .Select(f => new
                {
                    FacultyName = f.Name,
                    ContributionCount = f.Members.SelectMany(u => u.Contributions)
                        .Count(c => c.PeriodId == periodId)
                })
                .OrderByDescending(fc => fc.ContributionCount)
                .ToDictionaryAsync(fc => fc.FacultyName, fc => fc.ContributionCount);

            return facultyContributions;
        }

        private async Task<IDictionary<ContributionStatus, double>> AdminPercentageOfContributionByStatus(Guid periodId)
        {
            var totalContributions = await _context.Contributions.CountAsync(c => c.PeriodId == periodId);

            var statusDistribution = await _context.Contributions
                .Where(c => c.PeriodId == periodId)
                .GroupBy(c => c.Status)
                .Select(g => new
                {
                    Status = g.Key,
                    Percentage = ((double)g.Count() / totalContributions) * 100
                })
                .ToDictionaryAsync(g => g.Status, g => g.Percentage);

            return statusDistribution;
        }

        private async Task<double> AdminPercentageOfFeedbackedContribution(Guid periodId)
        {
            var totalContributions = await _context.Contributions.CountAsync(c => c.PeriodId == periodId);

            var contributionsWithFeedback = await _context.Contributions
                .Include(c => c.Feedbacks)
                .CountAsync(c => c.PeriodId == periodId && c.Feedbacks.Any());

            var feedbackPercentage = ((double)contributionsWithFeedback / totalContributions) * 100;

            return feedbackPercentage;
        }



        private async Task<List<NumberOfContributionByStatusWithinFacultyDto>> AdminNumberOfContributionByStatusWithinFaculty(Guid periodId)
        {
            var facultyContributionStatus = await _context.Faculties
                .Include(f => f.Members)
                .ThenInclude(u => u.Contributions.Where(c => c.PeriodId == periodId))
                .Select(f => new NumberOfContributionByStatusWithinFacultyDto()
                {
                    FacultyName = f.Name,
                    PublishedCount = f.Members.SelectMany(u => u.Contributions)
                        .Count(c => c.Status == ContributionStatus.Published),
                    ApprovedCount = f.Members.SelectMany(u => u.Contributions)
                        .Count(c => c.Status == ContributionStatus.Approved),
                    RejectedCount = f.Members.SelectMany(u => u.Contributions)
                        .Count(c => c.Status == ContributionStatus.Rejected)
                }).ToListAsync();

            return facultyContributionStatus;
        }
    }
}

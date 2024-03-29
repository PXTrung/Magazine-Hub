using Application.Common.Interfaces;
using Application.Features.Dashboards.DTO;
using Domain.Enums;
using ErrorOr;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Dashboards
{
    public class DashboardService : IDashboadService
    {
        private readonly IApplicationDbContext _context;

        public DashboardService(IApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<ErrorOr<IDictionary<string, int>>> GetFacultyRankByContribution(Guid periodId)
        {
            var period = await _context.Periods.FirstOrDefaultAsync(p => p.Id == periodId);

            if (period == null) return Error.NotFound(description: "Period not found");

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

        public async Task<ErrorOr<IDictionary<ContributionStatus, double>>> PercentageOfContributionByStatus(Guid periodId)
        {
            var period = await _context.Periods.FirstOrDefaultAsync(p => p.Id == periodId);

            if (period == null) return Error.NotFound(description: "Period not found");

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

        public async Task<ErrorOr<double>> PercentageOfFeedbackedContribution(Guid periodId)
        {
            var period = await _context.Periods.FirstOrDefaultAsync(p => p.Id == periodId);

            if (period == null) return Error.NotFound(description: "Period not found");

            var totalContributions = await _context.Contributions.CountAsync(c => c.PeriodId == periodId);

            var contributionsWithFeedback = await _context.Contributions
                .Include(c => c.Feedbacks)
                .CountAsync(c => c.PeriodId == periodId && c.Feedbacks.Any());

            var feedbackPercentage = ((double)contributionsWithFeedback / totalContributions) * 100;

            return feedbackPercentage;
        }



        public async Task<ErrorOr<List<NumberOfContributionByStatusWithinFacultyDto>>> NumberOfContributionByStatusWithinFaculty(Guid periodId)
        {
            var period = await _context.Periods.FirstOrDefaultAsync(p => p.Id == periodId);

            if (period == null) return Error.NotFound(description: "Period not found");

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

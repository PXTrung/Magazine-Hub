using Application.Features.Dashboards.DTO;
using Domain.Enums;
using ErrorOr;

namespace Application.Features.Dashboards
{
    public interface IDashboadService
    {
        Task<ErrorOr<IDictionary<string, int>>> GetFacultyRankByContribution(Guid periodId);

        Task<ErrorOr<List<NumberOfContributionByStatusWithinFacultyDto>>> NumberOfContributionByStatusWithinFaculty(Guid periodId);

        Task<ErrorOr<IDictionary<ContributionStatus, double>>> PercentageOfContributionByStatus(Guid periodId);

        Task<ErrorOr<double>> PercentageOfFeedbackedContribution(Guid periodId);



    }
}

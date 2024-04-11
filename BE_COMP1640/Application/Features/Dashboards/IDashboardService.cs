using Application.Features.Dashboards.DTO.AdminDashboardDTO;
using ErrorOr;

namespace Application.Features.Dashboards
{
    public interface IDashboardService
    {
        Task<ErrorOr<AdminDashboardDataDto>> GetAdminDashboard(Guid periodId);

    }
}

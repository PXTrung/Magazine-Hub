using Application.Features.Dashboards;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardsController : ApiController
    {
        private readonly IDashboardService _dashboardService;

        public DashboardsController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("Admin")]
        public async Task<IActionResult> GetFacultyContributionRank([FromQuery] Guid periodId)
        {
            var result = await _dashboardService.GetAdminDashboard(periodId);

            return result.Match(
                value => base.Ok(value),
                Problem);
        }

    }
}

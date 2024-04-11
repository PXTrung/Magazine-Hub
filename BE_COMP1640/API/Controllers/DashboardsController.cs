using Application.Features.Dashboards.AdminDashboardService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardsController : ApiController
    {
        private readonly IManagerDashboardService _dashboardService;

        public DashboardsController(IManagerDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }


        /// <summary>
        ///   [Manager] Get dashboard data for manager
        /// </summary>
        [HttpGet("Manager")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> ManagerDashboard([FromQuery] Guid periodId)
        {
            var result = await _dashboardService.GetManagerDashboard(periodId);

            return result.Match(
                value => base.Ok(value),
                Problem);
        }

    }
}

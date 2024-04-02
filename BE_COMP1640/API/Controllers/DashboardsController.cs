using Application.Features.Dashboards;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardsController : ApiController
    {
        private readonly IDashboadService _dashboadService;

        public DashboardsController(IDashboadService dashboadService)
        {
            _dashboadService = dashboadService;
        }

        [HttpGet("GetFacultyRankByContribution")]
        public async Task<IActionResult> GetFacultyContributionRank([FromQuery] Guid periodId)
        {
            var result = await _dashboadService.GetFacultyRankByContribution(periodId);

            return result.Match(
                value => base.Ok(value),
                Problem);
        }

        [HttpGet("NumberOfContributionByStatusWithinFaculty")]
        public async Task<IActionResult> NumberOfContributionByStatusWithinFaculty(Guid periodId)
        {
            var result = await _dashboadService.NumberOfContributionByStatusWithinFaculty(periodId);


            return result.Match(
                value => base.Ok(value),
                Problem);
        }

        [HttpGet("PercentageOfContributionByStatus")]
        public async Task<IActionResult> PercentageOfContributionByStatus(Guid periodId)
        {
            var result = await _dashboadService.PercentageOfContributionByStatus(periodId);

            return result.Match(
                value => base.Ok(value),
                Problem);
        }

        [HttpGet("PercentageOfFeedbackedContribution")]
        public async Task<IActionResult> PercentageOfFeedbackedContribution(Guid periodId)
        {
            var result = await _dashboadService.PercentageOfFeedbackedContribution(periodId);

            return result.Match(
                value => base.Ok(value),
                Problem);
        }
    }
}

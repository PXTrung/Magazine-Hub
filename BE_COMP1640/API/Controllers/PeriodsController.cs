using API.RequestModels.Periods;
using Application.Features.Periods.Commands.CreatePeriod;
using Application.Features.Periods.Commands.UpdatePeriod;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sieve.Services;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeriodsController : ApiController
    {
        private readonly ISender _sender;
        private readonly ISieveProcessor _sieveProcessor;

        public PeriodsController(ISender sender, ISieveProcessor sieveProcessor)
        {
            _sender = sender;
            _sieveProcessor = sieveProcessor;
        }


        /// <summary>
        ///    Create a new Period
        /// </summary>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromForm] CreatePeriodCommand request)
        {
            var result = await _sender.Send(request);

            return result.Match(
                _ => StatusCode(201),
                Problem);
        }


        /// <summary>
        ///    Update a Period by id
        /// </summary>
        [HttpPut]
        [Route("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> UpdatePeriod([FromRoute] Guid id, [FromBody] UpdatePeriodRequest request)
        {
            var command = new UpdatePeriodCommand(id: id,
                firstSubmissionDeadline: request.FirstSubmissionDeadline,
                secondSubmissionDeadline: request.SecondSubmissionDeadline);

            var result = await _sender.Send(command);

            return result.Match(
                _ => NoContent(),
                Problem);
        }

    }
}

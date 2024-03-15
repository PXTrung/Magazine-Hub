using API.RequestModels.Contribution;
using API.Sieve;
using Application.Features.Contributions.Commands.CreateContribution;
using Application.Features.Contributions.Commands.UpdateContribution;
using Application.Features.Contributions.Queries.GetContribution;
using Application.Features.Contributions.Queries.ListContribution;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;
using Sieve.Services;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContributionsController : ApiController
    {
        private readonly ISender _sender;
        private readonly ISieveProcessor _sieveProcessor;

        public ContributionsController(ISender sender, ISieveProcessor sieveProcessor)
        {
            _sender = sender;
            _sieveProcessor = sieveProcessor;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromForm] CreateContributionCommand command)
        {
            var result = await _sender.Send(command);
            return result.Match(
                value => base.Created(),
                Problem);
        }

        [HttpGet]
        public async Task<IActionResult> ListContribution([FromQuery] SieveModel sieveModel)
        {
            var result = await _sender.Send(new ListContributionQuery());


            if (result.IsError)
            {
                return Problem(result.Errors);
            }


            return base.Ok(await result.Value.ToPaginatedListAsync(_sieveProcessor, sieveModel));
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetContribution(Guid id)
        {
            var query = new GetContributionQuery(id);

            var result = await _sender.Send(query);

            return result.Match(
                value => base.Ok(value),
                Problem);
        }

        [HttpPut]
        [Route("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> UpdateContribution(Guid id, [FromForm] UpdateContributionRequest request)
        {
            var command = new UpdateContributionCommand(id, request.Title, request.Description, request.ImageFile,
                request.DocumentFile);

            var result = await _sender.Send(command);

            return result.Match(
                _ => NoContent(),
                Problem);
        }
    }
}

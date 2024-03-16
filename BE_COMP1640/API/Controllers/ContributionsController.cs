using API.RequestModels.Contributions;
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


        /// <summary>
        ///     Creating a new Contribution
        /// </summary>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateContribution([FromForm] CreateContributionCommand request)
        {
            var result = await _sender.Send(request);
            return result.Match(
                value => base.Created(),
                Problem);
        }


        /// <summary>
        ///     Get list of Contributions
        /// </summary>
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


        /// <summary>
        ///     Get one Contribution by id
        /// </summary>
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetContribution([FromRoute] Guid id)
        {
            var query = new GetContributionQuery(id);

            var result = await _sender.Send(query);

            return result.Match(
                value => base.Ok(value),
                Problem);
        }


        /// <summary>
        ///     Update one Contribution by id
        /// </summary>
        [HttpPut]
        [Route("{id:guid}")]
        [Authorize]
        public async Task<IActionResult> UpdateContribution([FromRoute] Guid id, [FromForm] UpdateContributionRequest request)
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

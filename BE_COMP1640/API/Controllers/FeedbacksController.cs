﻿using API.Sieve;
using Application.Features.Feedbacks.Commands.CreateFeedback;
using Application.Features.Feedbacks.Queries.ListFeedback;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;
using Sieve.Services;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbacksController : ApiController
    {
        private readonly ISender _sender;
        private readonly ISieveProcessor _sieveProcessor;

        public FeedbacksController(ISender sender, ISieveProcessor sieveProcessor)
        {
            _sender = sender;
            _sieveProcessor = sieveProcessor;
        }

        /// <summary>
        ///    Create a new Period
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Coordinator")]
        public async Task<IActionResult> CreateFeedback([FromBody] CreateFeedbackCommand request)
        {
            var result = await _sender.Send(request);

            return result.Match(
                value => StatusCode(201, value),
                Problem);
        }

        [HttpGet]
        [Authorize(Roles = "Coordinator")]
        public async Task<IActionResult> ListFeedback([FromQuery] SieveModel sieveModel)
        {
            var result = await _sender.Send(new ListFeedbackQuery());


            if (result.IsError)
            {
                return Problem(result.Errors);
            }


            return base.Ok(await result.Value.ToPaginatedListAsync(_sieveProcessor, sieveModel));
        }
    }
}

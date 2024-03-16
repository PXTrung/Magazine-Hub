using Application.Features.Auth.Commands.ConfirmEmail;
using Application.Features.Auth.Commands.Login;
using Application.Features.Auth.Commands.Register;
using Application.Features.Auth.Commands.UpdateProfile;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ApiController
{
    private readonly ISender _sender;

    public AuthController(ISender sender)
    {
        _sender = sender;
    }


    /// <summary>
    ///     Registering a new account
    /// </summary>
    [HttpPost]
    [Route("Register")]
    public async Task<IActionResult> Register([FromBody] RegisterCommand request)
    {
        var authResult = await _sender.Send(request);

        return authResult.Match(
            result => base.Ok(result),
            Problem);
    }

    /// <summary>
    ///     Login to get JWT
    /// </summary>
    [HttpPost]
    [Route("Login")]
    public async Task<IActionResult> Login([FromBody] LoginCommand request)
    {
        var authResult = await _sender.Send(request);

        return authResult.Match(
            result => base.Ok(result),
            Problem);
    }


    /// <summary>
    ///     Update oneself profile
    /// </summary>
    [HttpPut]
    [Route("UpdateProfile")]
    [Authorize]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileCommand command)
    {
        var result = await _sender.Send(command);

        return result.Match(
            _ => NoContent(),
            Problem);
    }

    /// <summary>
    ///    [Ignore] Just only for confirming email via sent email
    /// </summary>
    [HttpGet]
    [Route("ConfirmEmail")]
    public async Task<IActionResult> ConfirmEmail([FromQuery] ConfirmEmailCommand command)
    {

        var result = await _sender.Send(command);

        return result.Match(
            value => base.Ok("Confirmed email successfully, now you can login"),
            Problem);
    }




}
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

    [HttpPost]
    [Route("Register")]
    public async Task<IActionResult> Register([FromBody] RegisterCommand request)
    {
        var authResult = await _sender.Send(request);

        return authResult.Match(
            result => base.Ok(result),
            Problem);
    }


    [HttpPost]
    [Route("Login")]
    public async Task<IActionResult> Login([FromBody] LoginCommand request)
    {
        var authResult = await _sender.Send(request);

        return authResult.Match(
            result => base.Ok(result),
            Problem);
    }


    //Endpoint for editing self information
    [HttpPut]
    [Route("UpdateProfile")]
    [Authorize]
    public async Task<IActionResult> UpdateProfile(UpdateProfileCommand command)
    {
        var result = await _sender.Send(command);

        return result.Match(
            _ => NoContent(),
            Problem);
    }


    [HttpGet]
    [Route("ConfirmEmail")]
    public async Task<IActionResult> ConfirmEmail([FromQuery] ConfirmEmailCommand command)
    {

        var result = await _sender.Send(command);

        return result.Match(
            value => base.Ok("Confirmed email successfully, now you can login"),
            Problem);
    }


    //Endpoint for changing password
    [HttpPut]
    [Route("ChangePassword")]
    public async Task<IActionResult> ChangePassword()
    {
        return NoContent();
    }

}
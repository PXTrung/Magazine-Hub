using API.Sieve;
using Application.Features.Auth.Commands.AssignRole;
using Application.Features.Auth.Commands.ConfirmEmail;
using Application.Features.Auth.Commands.Login;
using Application.Features.Auth.Commands.Register;
using Application.Features.Auth.Commands.ResetPassword;
using Application.Features.Auth.Commands.UpdateProfile;
using Application.Features.Auth.Queries.GetResetPasswordOTP;
using Application.Features.Auth.Queries.ListRole;
using Application.Features.Auth.Queries.ListUser;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;
using Sieve.Services;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ApiController
{
    private readonly ISender _sender;
    private readonly ISieveProcessor _sieveProcessor;

    public AuthController(ISender sender, ISieveProcessor sieveProcessor)
    {
        _sender = sender;
        _sieveProcessor = sieveProcessor;
    }


    /// <summary>
    ///    Registering a new account
    /// </summary>
    [HttpPost]
    [Route("Register")]
    public async Task<IActionResult> Register([FromBody] RegisterCommand request)
    {
        var authResult = await _sender.Send(request);

        return authResult.Match(
            value => base.StatusCode(201, value),
            Problem);
    }

    /// <summary>
    ///   Login to get JWT
    /// </summary>
    [HttpPost]
    [Route("Login")]
    public async Task<IActionResult> Login([FromBody] LoginCommand request)
    {
        var authResult = await _sender.Send(request);

        return authResult.Match(
            value => base.Ok(value),
            Problem);
    }


    /// <summary>
    ///   [MustAuthenticated]  Update oneself profile
    /// </summary>
    [HttpPut]
    [Route("UpdateProfile")]
    [Authorize]
    public async Task<IActionResult> UpdateProfile([FromForm] UpdateProfileCommand command)
    {
        var result = await _sender.Send(command);

        return result.Match(
            value => base.Ok(value),
            Problem);
    }

    /// <summary>
    ///    (Ignore this) Just only for confirming email via sent email
    /// </summary>
    [HttpGet]
    [Route("ConfirmEmail")]
    public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailCommand command)
    {

        var result = await _sender.Send(command);

        return result.Match(
            value => base.Ok("Confirmed email successfully, now you can login"),
            Problem);
    }

    [HttpPost]
    [Route("SendResetPasswordOTP")]
    public async Task<IActionResult> SendResetPasswordOTP([FromBody] GetResetPasswordOTPQuery request)
    {

        var result = await _sender.Send(request);

        return result.Match(
            value => base.Ok(value),
            Problem);
    }

    [HttpPost]
    [Route("ResetPassword")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCommand request)
    {

        var result = await _sender.Send(request);

        return result.Match(
            value => base.Ok(value),
            Problem);
    }



    /// <summary>
    ///    List all users in the system
    /// </summary>
    [HttpGet]
    [Route("Users")]
    public async Task<IActionResult> ListUser([FromQuery] SieveModel sieveModel)
    {

        var result = await _sender.Send(new ListUserQuery());


        if (result.IsError)
        {
            return Problem(result.Errors);
        }


        return base.Ok(await result.Value.ToPaginatedListAsync(_sieveProcessor, sieveModel));

    }

    /// <summary>
    ///     List all roles in the system
    /// </summary>
    [HttpGet]
    [Route("Roles")]
    public async Task<IActionResult> ListRole([FromQuery] SieveModel sieveModel)
    {
        var result = await _sender.Send(new ListRoleQuery());

        if (result.IsError)
        {
            return Problem(result.Errors);
        }

        return base.Ok(await result.Value.ToPaginatedListAsync(_sieveProcessor, sieveModel));
    }

    /// <summary>
    ///   [Admin]  Assign role to user
    /// </summary>
    [HttpPut]
    [Route("AssignRole")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> AssignRole([FromBody] AssignRoleCommand request)
    {
        var result = await _sender.Send(request);

        return result.Match(
            value => base.Ok(value),
            Problem);
    }
}
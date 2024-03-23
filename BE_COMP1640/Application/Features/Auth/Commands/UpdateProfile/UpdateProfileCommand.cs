﻿using Application.Common.Models;
using ErrorOr;
using MediatR;

namespace Application.Features.Auth.Commands.UpdateProfile;

public record UpdateProfileCommand : IRequest<ErrorOr<SuccessResult>>
{

    /// <example>Trung</example>
    public string FirstName { get; set; }


    /// <example>Pham</example>
    public string LastName { get; set; }
}
﻿namespace Application.Common.Models
{
    public record CurrentUser(
        Guid Id,
        string FirstName,
        string LastName,
        string Email,
        IReadOnlyList<string> Roles);
}

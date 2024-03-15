using Application.Common.Interfaces;
using Application.Common.Models;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Infrastructure.Identity.Services;


public class CurrentUserProvider(IHttpContextAccessor httpContextAccessor) : ICurrentUserProvider
{
    public CurrentUser GetCurrentUser()
    {
        var id = Guid.Parse(GetSingleClaimValue("id"));
        var roles = GetClaimValues(ClaimTypes.Role);
        var firstName = GetSingleClaimValue(ClaimTypes.GivenName);
        var lastName = GetSingleClaimValue(ClaimTypes.Surname);
        var email = GetSingleClaimValue(ClaimTypes.Email);
        return new CurrentUser(id, email, firstName, lastName, roles);
    }

    private List<string> GetClaimValues(string claimType) =>
        httpContextAccessor.HttpContext!.User.Claims
            .Where(claim => claim.Type == claimType)
            .Select(claim => claim.Value)
            .ToList();

    private string GetSingleClaimValue(string claimType) =>
        httpContextAccessor.HttpContext!.User.Claims
            .Single(claim => claim.Type == claimType)
            .Value;
}
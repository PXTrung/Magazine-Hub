using Domain.Common;

namespace Domain.Entities;

public class Faculty : AuditableBaseEntity
{
    public string Name { get; set; }

    public ICollection<Contribution> Contributions { get; set; }

    public ICollection<ApplicationUser> Members { get; set; }

}
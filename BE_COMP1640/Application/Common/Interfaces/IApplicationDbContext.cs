using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces;

public interface IApplicationDbContext
{
    public DbSet<Contribution> Contributions { get; }

    public DbSet<Faculty> Faculties { get; }

    public DbSet<Feedback> Feedbacks { get; }

    public DbSet<Media> Media { get; }

    public DbSet<SubmissionPeriod> SubmissionPeriods { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Contribution> Contributions => Set<Contribution>();

    public DbSet<Faculty> Faculties => Set<Faculty>();

    public DbSet<Feedback> Feedbacks => Set<Feedback>();

    public DbSet<Media> Media => Set<Media>();

    public DbSet<SubmissionDeadline> SubmissionDeadlines => Set<SubmissionDeadline>();

    public DbSet<ApplicationUser> Users => Set<ApplicationUser>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }

}
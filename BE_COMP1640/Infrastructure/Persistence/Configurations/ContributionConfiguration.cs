using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class ContributionConfiguration : IEntityTypeConfiguration<Contribution>
    {
        public void Configure(EntityTypeBuilder<Contribution> builder)
        {

            builder.Property(c => c.Title)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(c => c.Description)
                .HasMaxLength(500)
                .IsRequired();

            builder.Property(c => c.Status)
                .HasConversion<string>()
                .IsRequired();

            builder.HasMany<Feedback>(c => c.Feedbacks)
                .WithOne(f => f.Contribution)
                .HasForeignKey(f => f.ContributionId)
                .OnDelete(DeleteBehavior.NoAction);


            builder.HasOne<ApplicationUser>(c => c.CreatedBy)
                .WithMany(u => u.Contributions)
                .HasForeignKey(c => c.CreatedById)
                .HasPrincipalKey(u => u.Id)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne<SubmissionDeadline>(c => c.SubmissionDeadline)
                .WithMany(s => s.Contributions)
                .HasForeignKey(s => s.SubmissionDeadlineId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(c => c.Image)
                .WithOne()
                .HasForeignKey<Contribution>(c => c.ImageId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(c => c.Document)
                .WithOne()
                .HasForeignKey<Contribution>(c => c.DocumentId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}

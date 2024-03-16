﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class FacultyConfiguration : IEntityTypeConfiguration<Faculty>
    {
        public void Configure(EntityTypeBuilder<Faculty> builder)
        {
            builder.Property(f => f.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.HasMany(f => f.Contributions)
                .WithOne(c => c.Faculty)
                .HasForeignKey(c => c.FacultyId)
                .OnDelete(DeleteBehavior.NoAction);


            builder.HasOne<ApplicationUser>(c => c.CreatedBy)
                .WithMany()
                .HasForeignKey(c => c.CreatedById)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany<ApplicationUser>(f => f.Members)
                .WithOne(u => u.Faculty)
                .HasForeignKey(u => u.FacultyId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.NoAction);



        }
    }
}

﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder.HasOne(u => u.Avatar)
                .WithOne()
                .HasForeignKey<ApplicationUser>(u => u.AvatarId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}

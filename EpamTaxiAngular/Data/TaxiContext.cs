using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using EpamTaxiAngular.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;

namespace EpamTaxiAngular.Data
{
    public class TaxiContext : ApiAuthorizationDbContext<User>
    {
        public DbSet<Order> Orders { get; set; }

        public TaxiContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // конвертируем все даты в UTC
            // https://github.com/dotnet/efcore/issues/4711#issuecomment-535288442
            var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
                v => v.ToUniversalTime(),
                v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

            var nullableDateTimeConverter = new ValueConverter<DateTime?, DateTime?>(
                v => v.HasValue ? v.Value.ToUniversalTime() : v,
                v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : v);

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Orders");

                entity.HasIndex(e => e.UserId, "UserID");

                entity.HasIndex(e => e.OrderDate, "OrderDate");

                entity.Property(e => e.OrderId).HasColumnName("OrderID");

                entity.Property(e => e.UserId).HasColumnName("UserID");
                    
                entity.Property(e => e.OrderDate).HasColumnType("datetime")
                    .HasConversion(dateTimeConverter);

                entity.Property(e => e.CarDeliveryTime).HasColumnType("datetime")
                    .IsRequired(false)
                    .HasConversion(dateTimeConverter);

                entity.Property(e => e.FromLocation).HasMaxLength(200);

                entity.Property(e => e.ToLocation).HasMaxLength(200);

                entity.Property(e => e.Cost)
                    .HasColumnType("money");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Orders_Users");
            });

            modelBuilder.Entity<IdentityRole>(entity =>
            {
                entity.HasData(
                 new IdentityRole
                 {
                     Name = "User",
                     NormalizedName = "USER"
                 },
                 new IdentityRole
                 {
                     Name = "Administrator",
                     NormalizedName = "ADMINISTRATOR"
                 }
                 );
            });
        }
    }
}

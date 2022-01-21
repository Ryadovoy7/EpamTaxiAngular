using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using EpamTaxiAngular.Models;

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

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Orders");

                //entity.HasIndex(e => e.UserId, "UserID");

                entity.HasIndex(e => e.UserName, "UserName");

                //entity.HasIndex(e => e.OrderDate, "OrderDate");

                entity.Property(e => e.OrderId).HasColumnName("OrderID");

                //entity.Property(e => e.UserId).HasColumnName("UserID");

                //entity.Property(e => e.UserName).HasMaxLength(60);

                //entity.Property(e => e.OrderDate).HasColumnType("datetime");

                //entity.Property(e => e.CarDeliveryTime).HasColumnType("time");

                //entity.Property(e => e.FromLocation).HasMaxLength(200);

                //entity.Property(e => e.ToLocation).HasMaxLength(200);

                entity.Property(e => e.Cost)
                    .HasColumnType("money");

                //entity.HasOne(d => d.User)
                //    .WithMany(p => p.Orders)
                //    .HasForeignKey(d => d.UserId)
                //    .HasConstraintName("FK_Orders_Users");
            });
        }
    }
}

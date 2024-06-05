using Microsoft.EntityFrameworkCore;
using CandyShop.API.Models;
namespace CandyShop.API.Data;


public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<User> Users{ get; set; }
    public DbSet<Order> Orders{ get; set; }
    public DbSet<Product> Products{ get; set; }
    public DbSet<ProductImage> ProductImages{ get; set; }
    public DbSet<UserAvatar> UserAvatars{ get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
        .HasMany(u => u.Orders)
        .WithOne(a => a.User)
        .IsRequired(false);

        modelBuilder.Entity<User>()
        .HasOne(u => u.Avatar)
        .WithOne(a => a.User)
        .IsRequired(false);

        modelBuilder.Entity<Order>()
        .HasMany(o => o.Products)
        .WithMany()
        .UsingEntity(t => t.ToTable("ProductsOrder"));

        modelBuilder.Entity<Product>()
        .HasMany(p => p.Images)
        .WithOne()
        .HasForeignKey("ImageID")
        .IsRequired(false);
    }
}

using Microsoft.EntityFrameworkCore;
using CandyShop.API.Models;
namespace CandyShop.API.Data;


public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<User> Users{ get; set; }
    public DbSet<Order> Orders{ get; set; }
    public DbSet<OrderItem> Items{ get; set; }
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
        .HasMany(o => o.Items)
        .WithOne(i => i.Order)
        .HasForeignKey(o => o.OrderId)
        .IsRequired(true);

        modelBuilder.Entity<OrderItem>()
        .HasOne(o => o.Product)
        .WithMany()
        .HasForeignKey(o => o.ProductId)
        .IsRequired(true);

        modelBuilder.Entity<Product>()
        .HasMany(p => p.Images)
        .WithOne(p => p.Product)
        .HasForeignKey(p => p.ProductId)
        .OnDelete(DeleteBehavior.Cascade)
        .IsRequired(false);
    }
}

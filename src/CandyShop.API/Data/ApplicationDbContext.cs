using Microsoft.EntityFrameworkCore;
using CandyShop.API.Models;
namespace CandyShop.API.Data;


public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<User> Users{ get; set; }
    public DbSet<Order> Orders{ get; set; }
    public DbSet<Basket> Baskets{ get; set; }
    public DbSet<Product> Products{ get; set; }
    public DbSet<ProductImage> ProductImages{ get; set; }
    public DbSet<UserAvatar> UserAvatars{ get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        //user
        modelBuilder.Entity<User>()
        .HasOne(u => u.Basket)
        .WithOne(b => b.User);

        modelBuilder.Entity<User>()
        .HasMany(e => e.Orders)
        .WithOne(u => u.User);

        modelBuilder.Entity<User>()
        .HasOne(a => a.Avatar)
        .WithOne(u => u.User);

        modelBuilder.Entity<UserAvatar>()
        .HasOne(a => a.User)
        .WithOne(u => u.Avatar);

        //product
        modelBuilder.Entity<Product>()
        .HasMany(p => p.Images)
        .WithOne(i => i.Product);

        modelBuilder.Entity<ProductImage>()
        .HasOne(p => p.Product)
        .WithMany(p => p.Images);


        //Basket
        modelBuilder.Entity<Basket>()
        .HasMany(b => b.Products)
        .WithOne()
        .HasForeignKey("ProductID");
        
        modelBuilder.Entity<Basket>()
        .HasOne(b => b.User)
        .WithOne(u => u.Basket);

        //order
        modelBuilder.Entity<Order>()
        .HasOne<User>()
        .WithMany(u => u.Orders);
        
        modelBuilder.Entity<Order>()
        .HasMany(o => o.Products)
        .WithOne();
    }
}

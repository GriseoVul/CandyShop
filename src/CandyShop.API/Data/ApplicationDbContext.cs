using Microsoft.EntityFrameworkCore;
using CandyShop.API.Models;
namespace CandyShop.API.Data;


public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<User> Users{ get; set; }
    public DbSet<Order> Orders{ get; set; }
    public DbSet<Basket> Baskets{ get; set; }
    public DbSet<Product> Products{ get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //create table connections
    }
}

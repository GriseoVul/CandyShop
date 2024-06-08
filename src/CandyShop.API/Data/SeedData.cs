using CandyShop.API.Enums;
using CandyShop.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CandyShop.API.Data;

public static class SeedData
{
    public static void Initialise(IServiceProvider serviceProvider)
    {
        using (var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                if (context.Products.Any())
                {
                    return;
                }

                //var products = new List<Product>();
                Random r = new();
                for(int i = 0; i < 50; i++)
                {
                    var price = r.Next(1000);
                    var discount = r.Next(100) > 70 ? r.Next(50) : 0;
                    var image = context.ProductImages.Add(new ProductImage
                    {
                        Name = "C" + r.Next(4) + ".webp",
                    });
                    var entry = context.Products.Add(new Product
                    {
                        Name = "Candy" + i.ToString(),
                        Description = "This is description of a Candy"+ i.ToString(),
                        Count = 1,
                        Price = price,
                        Discount = discount,
                        TotalPrice = price - (price / 100 * discount),
                        Category = (ProductCategory)r.Next(15),
                        Images = [ image.Entity ]
                    });
                };

                context.SaveChanges();   
            }
    }
}

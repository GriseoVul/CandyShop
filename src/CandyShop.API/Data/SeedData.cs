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
                for(int i = 0; i < 100; i++)
                {
                    var price = r.Next(1000);
                    var discount = r.Next(100) > 30 ? r.Next(50) : 0;
                    context.Products.Add(new Product
                    {
                        Name = "Candy" + i.ToString(),
                        Description = "This is description of a Candy"+ i.ToString(),
                        Count = 1,
                        Price = price,
                        Discount = discount,
                        TitalPrice = price / 100 * discount,
                        Category = (ProductCategory)r.Next(15),
                        Images = 
                        [ new() { 
                            Id = 0,
                            Name = "C" + r.Next(4) + ".webp"
                            }
                        ]
                    });
                    context.ProductImages.Add(new ProductImage
                    {
                        Name = "C" + r.Next(4) + ".webp"
                    });
                };

                context.SaveChanges();   
            }
    }
}

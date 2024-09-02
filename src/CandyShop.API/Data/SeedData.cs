using System.Collections.ObjectModel;
using System.Net.Mime;
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
                
                int ProductCount = 100;
                int OrderCount = 100;
                int OrderItemCountMax = 10;
                int OrderItemProductCounMax = 10;

                Random r = new();
                
                //adding ProductCategories
                if(!context.ProductCategories.Any())
                {
                    List<String> StandartTypes = [
                        "Empty",
                        "Chocolate", 
                        "HardCandy", 
                        "GummyCandy", 
                        "Caramel", 
                        "Toffee", 
                        "Fudge", 
                        "Lollipops", 
                        "Nougat", 
                        "Marshmallows", 
                        "Licorice", 
                        "JellyBeans", 
                        "Taffy", 
                        "Truffles", 
                        "Bonbons", 
                        "CandyCorn"
                    ];
                    foreach(var t in StandartTypes)
                    {
                        context.ProductCategories.Add(new ProductCategory
                        {
                            Name = t,
                        });
                    }
                }
                context.SaveChanges(); 
                //Adding Products
                if (!context.Products.Any() && context.ProductCategories.Any())
                {
                    var countTypes = context.ProductCategories.Count();
                    List<string> CandyNames = [
                        "fo","to","po","no","so",
                        "fi","ti","pi","ni","si",
                        "fy","ty","py","ny","sy",
                        "fa","ta","pa","na","sa"
                    ];
                    var CandyNamesCound = CandyNames.Count;

                    for(int i = 0; i < ProductCount; i++)
                    {
                        var price = r.Next(1000);
                        var discount = r.Next(100) > 70 ? r.Next(50) : 0;
                        var image = context.ProductImages.Add(new ProductImage
                        {
                            Name = "C" + r.Next(4) + ".webp",
                        });
                        string name = 
                            CandyNames[r.Next(CandyNamesCound)] + 
                            CandyNames[r.Next(CandyNamesCound)] + 
                            CandyNames[r.Next(CandyNamesCound)];
                        
                        var entry = context.Products.Add(new Product
                        {
                            Name = "Candy " + 
                                name[0].ToString().ToUpper() + name[1..],
                            Description = "This is description of a Candy"+ name[0].ToString().ToUpper() + name[1..],
                            Count = r.Next(100),
                            Price = price,
                            Discount = discount,
                            TotalPrice = price - (price / 100 * discount),
                            Category = context.ProductCategories.AsEnumerable().OrderBy(a => r.Next(countTypes)).Take(1).First(),
                            Images = [ image.Entity ]
                        });
                    };
                }
                context.SaveChanges(); 
                //Adding Orders, OrderItems and Users
                if(!context.Orders.Any() && context.Products.Any() && context.ProductCategories.Any())
                {
                    for(int i = 0; i < OrderCount; i++)
                    {
                        var DataItem = RandomData.data[ r.Next(RandomData.data.Count) ];
                        List<OrderItem> Items = [];

                        DateTime minDate = new(2007, 1, 1, 10, 0, 0); 
                        TimeSpan time = DateTime.Now - minDate;
                        TimeSpan newTime = new TimeSpan(0, r.Next(0, (int)time.TotalMinutes), 0);
                        DateTime newDate = minDate + newTime;
                        
                        var ProductMax = context.Products.Count();
                        var order = new Order
                        {
                            CustomerName = DataItem.name,
                            CustomerAddress = DataItem.address,
                            CustomerPhoneNumber = DataItem.phone,
                            CreatedAt = newDate,
                            UpdatedAt = newDate,
                            TrackId = DataItem.postalZip,
                            AdditionalData = DataItem.email + " " + DataItem.postalZip + "\n" + DataItem.name,
                            Status = (OrderStatus)r.Next((int)OrderStatus.Delivered),

                        };
                        

                        for(int j = 0; j < OrderItemCountMax; j++)
                        {
                            var product = context.Products.AsEnumerable().OrderBy(a => r.Next(ProductMax)).Take(1).First();
                            ProductUnit u = (ProductUnit)r.Next((int)ProductUnit.Kg);
                            Items.Add( new OrderItem(){
                                ProductId = product.Id,
                                Product = product,
                                //если это ШТУКИ, то рандомим в районе от 0 до OrderItemProductCounMax иначе до 10 кг
                                ProductQuantity = u == ProductUnit.Pcs ? r.Next(OrderItemProductCounMax) : (float)r.Next(1000) / 100,
                                Unit = u,
                                OrderId = i,
                                Order = order
                            });
                        }

                        //если нет в БД, то создаём нового
                        User user = context.Users.FirstOrDefault(x => x.Login == DataItem.name.Trim() ) ?? context.Users.Add(
                        new User {
                            Name = DataItem.name,
                            Login = DataItem.name.Trim(),
                            HashPassword = String.Empty,
                            PhoneNumber = DataItem.phone,
                            Email = DataItem.email,
                            Role = UserRole.User,
                            Avatar = null!
                        }).Entity;

                        order.User = user;
                        order.User.Orders.Add(order);
                        order.Items = Items;

                        var entry = context.Orders.Add(order);
                    }
                }
                

                context.SaveChanges();   
            }
    }
}

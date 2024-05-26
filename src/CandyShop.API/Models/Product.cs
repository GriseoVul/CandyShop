using CandyShop.API.Enums;

namespace CandyShop.API.Models;

public class Product
{
    public int Id { get; set;} = 0;
    public string Name { get; set;} = String.Empty;
    public string Description { get; set; } = String.Empty;

    public ProductCategory Category { get; set; } = ProductCategory.Empty;
}

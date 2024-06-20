using CandyShop.API.Enums;

namespace CandyShop.API.Models;

public class Product
{ 
    public int Id { get; set;} = 0;
    public string Name { get; set;} = String.Empty;
    public string Description { get; set; } = String.Empty;
    public float Count { get; set; } = 0.0f;
    public ProductUnits Units { get; set; } = ProductUnits.Empty;
    public decimal Price { get; set; } = 0;
    public decimal Discount { get; set; } = 0;
    public decimal TotalPrice { get; set; } = 0;
    public ProductCategory Category { get; set; } = ProductCategory.Empty;
    public ICollection<ProductImage> Images { get; set;} = [];
}

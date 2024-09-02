using CandyShop.API.Enums;

namespace CandyShop.API.Models;

public class Product
{ 
    public int Id { get; set;} = 0;
    public string Name { get; set;} = String.Empty;
    public string Description { get; set; } = String.Empty;
    public float Count { get; set; } = 0.0f;
    public ProductUnit Units { get; set; } = ProductUnit.Empty;
    public float Price { get; set; } = 0;
    public float Discount { get; set; } = 0;
    public float TotalPrice { get; set; } = 0;
    public bool IsVisible{ get; set; } = false;
    public ProductCategory? Category { get; set; } = null;
    public ICollection<ProductImage> Images { get; set;} = [];
}

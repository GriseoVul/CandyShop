using CandyShop.API.Enums;

namespace CandyShop.API.DTOs;

public class ProductDTO
{
    public int Id { get; set;} = 0;
    public string Name { get; set;} = String.Empty;
    public decimal TotalPrice { get; set; } = 0;
    public string ImageName { get; set; } = String.Empty;
}

public class ProductDetailDTO
{
    public int Id { get; set;} = 0;
    public string Name { get; set;} = String.Empty;
    public string Description { get; set; } = String.Empty;

    //unused 
    //public int Count { get; set; } = 0; 
    public decimal Price { get; set; } = 0;
    public decimal Discount { get; set; } = 0;
    public decimal TotalPrice { get; set; } = 0;
    public string Category { get; set; } = String.Empty;
    public ICollection<string> ImageNames { get; set; } = null!;
}
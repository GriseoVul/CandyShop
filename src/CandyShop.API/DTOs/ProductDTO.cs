using CandyShop.API.Enums;

namespace CandyShop.API.DTOs;

public class ProductDTO
{
    public int Id { get; set;} = 0;
    public string Name { get; set;} = String.Empty;
    public decimal TitalPrice { get; set; } = 0;
    public IFormFile Image { get; set; } = null!;
}

public class ProductDetailDTO
{
    public string Description { get; set; } = String.Empty;
    public int Count { get; set; } = 0;
    public decimal Price { get; set; } = 0;
    public decimal Discount { get; set; } = 0;
    public decimal TitalPrice { get; set; } = 0;
    public ProductCategory Category { get; set; } = ProductCategory.Empty;
    public ICollection<IFormFile> Images { get; set; } = null!;
}
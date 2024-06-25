using CandyShop.API.Data;
using CandyShop.API.Enums;

namespace CandyShop.API.DTOs;


public class ProductDTO
{
    public int Id { get; set;} = 0;
    public string Name { get; set;} = String.Empty;
    public string Description { get; set; } = String.Empty;
    public float Count { get; set; } = 0; 
    public string Units {get; set; } = String.Empty;
    public float Price { get; set; } = 0;
    public float Discount { get; set; } = 0;
    public float TotalPrice { get
        {
            return Price - (Price/100 * Discount);
        }}
    public string Category { get; set; } = String.Empty;
    public ICollection<string> ImageNames { get; set; } = null!;
}
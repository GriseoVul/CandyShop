using CandyShop.API.Enums;

namespace CandyShop.API.Models;

public class OrderItem
{
    public int Id { get; set;} = 0;
    public int ProductId { get; set;} = 0;
    public Product Product { get; set;} = null!;
    public float ProductQuantity { get; set; } = 0;
    public ProductUnit Unit{ get; set; } = ProductUnit.Empty;
    public int OrderId { get; set;} = 0;
    public Order Order { get; set; } = null!;
    public float SubTotal {get { return Product.TotalPrice * ProductQuantity;}}
}

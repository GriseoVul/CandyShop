using CandyShop.API.Models;

namespace CandyShop.API;

public class OrderItem
{
    public int Id { get; set;} = 0;
    public int ProductId { get; set;} = 0;
    public Product Product { get; set;} = null!;
    public int ProductQuantity { get; set; } = 0;
    public int OrderId { get; set;} = 0;
    public decimal SubTotal {get { return Product.TotalPrice * ProductQuantity;}}
}

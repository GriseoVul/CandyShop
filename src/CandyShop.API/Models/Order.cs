using CandyShop.API.Enums;
namespace CandyShop.API.Models;

public class Order
{
    public int Id { get; set;} = 0;
    public string Name { get; set;} = string.Empty;
    public int PhoneNumber{ get; set;} = int.MinValue;
    public ICollection<Product> Products{ get; set;} = [];
    public OrderStatus Status { get; set;} = OrderStatus.Empty;

}

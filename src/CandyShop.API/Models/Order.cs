using CandyShop.API.Enums;
namespace CandyShop.API.Models;

public class Order
{
    public int Id { get; set;} = 0;
    public string Title { get; set;} = string.Empty; 
    public int PhoneNumber{ get; set;} = int.MinValue;
    public string Address { get; set;} = string.Empty;
    public OrderStatus Status { get; set;} = OrderStatus.Empty;

    public User User { get; set;} = new User();
    public ICollection<Product> Products{ get; set;} = [];
    
}

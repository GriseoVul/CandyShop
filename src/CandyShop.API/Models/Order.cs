using CandyShop.API.DTOs;
using CandyShop.API.Enums;
namespace CandyShop.API.Models;

public class Order
{
    public int Id { get; set;} = 0;
    public string CustomerName { get; set;} = string.Empty; 
    public string CustomerPhoneNumber{ get; set;} = string.Empty;
    public string CustomerAddress { get; set;} = string.Empty;
    public float TotalPrice { get 
        {
            float result = 0;

            foreach (var prod in Items)
            {
                result += prod.Product.Price * prod.ProductQuantity;
            }
            return result;
        }}
    public string AdditionalData { get; set;} = string.Empty;
    public OrderStatus Status { get; set;} = OrderStatus.Empty;

    public User User { get; set;} = null!;
    public ICollection<OrderItem> Items{ get; set;} = [];
}

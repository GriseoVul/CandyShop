namespace CandyShop.API.Models;

public class Basket
{
    public int Id { get; set;}
    public ICollection<Product> Products { get; set;} = [];
    public User User { get; set;} = new User();
}

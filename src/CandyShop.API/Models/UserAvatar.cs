namespace CandyShop.API.Models;

public class UserAvatar
{
    public int Id { get; set; } = 0;
    public string Name { get; set; } = String.Empty;
    public string ContentType{ get; set; } = "image/jpeg";
    public User User{ get; set; } = new User();
    public int UserId { get; set; }
}

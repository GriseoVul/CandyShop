namespace CandyShop.API.Models;

public class SpecialOffer
{
    public int Id { get; set;} = 0;
    public string Name { get; set;} = String.Empty;
    public string ContentType { get; set;} = "image/jpeg";
    public string ImageName{ get; set;} = String.Empty;
    public DateTime CreatedAt { get; set;}  = DateTime.Now;
    public bool IsVisible { get; set;}  = false;
}

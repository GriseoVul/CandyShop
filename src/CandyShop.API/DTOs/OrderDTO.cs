namespace CandyShop.API.DTOs;

public class OrderDTO
{
    public int Id { get; set;} = 0;
    public string Title { get; set;} = string.Empty; 
    public int PhoneNumber{ get; set;} = int.MinValue;
    public string Address { get; set;} = string.Empty;

    public string Status {get; set; } = string.Empty;
    public string UserName { get; set;} = string.Empty;

    public ICollection<ProductDTO> Products { get; set; } = [];
}

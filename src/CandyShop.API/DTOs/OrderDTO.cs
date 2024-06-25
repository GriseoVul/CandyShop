using CandyShop.API.Options;

namespace CandyShop.API.DTOs;

public class OrderDTO
{
    public int Id { get; set;} = 0;
    public string CustomerName { get; set;} = string.Empty; 
    public string CustomerPhoneNumber{ get; set;} = string.Empty;
    public string CustomerAddress { get; set;} = string.Empty;
    public float TotalPrice { get; set;} = 0;
    public string AdditionalData { get; set;} = string.Empty;

    public string Status {get; set; } = string.Empty;
    
    public int UserId { get; set;} = 0;
    public string UserName { get; set;} = string.Empty;

    public ICollection<ProductDTO> Products { get; set; } = [];
}

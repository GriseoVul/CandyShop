using CandyShop.API.DTOs;
using CandyShop.API.Models;

namespace CandyShop.API.Services;

public interface IOrderService
{
    Task<IEnumerable<OrderDTO>> GetAllAsync();
    Task<OrderDTO> PlaceNewOrder(OrderDTO order);
    Task<OrderDTO?> ChangeStatus(int id, string status);


}

using CandyShop.API.Models;
using CandyShop.API.Enums;
namespace CandyShop.API.Repos;

public interface IOrderRepository
{
    Task<Order?> GetByIdAsync(int id);
    
    Task<Order?> UpdateStatusAsync(int id,  OrderStatus status);
    Task<IEnumerable<Order>> GetAllAsync();
    Task<Order> AddAsync(Order order);
    Task<Order?> UpdateAsync(Order order);
    Task<int> DeleteAsync(int id);
}

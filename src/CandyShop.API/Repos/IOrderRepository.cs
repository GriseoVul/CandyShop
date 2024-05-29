using CandyShop.API.Models;
using CandyShop.API.Enums;
namespace CandyShop.API.Repos;

public interface IOrderRepository
{
    Task<Order?> GetByIdAsync(int id);
    Task<IEnumerable<Order>> GetRangeFromAsync(int id, int count);
    Task<IEnumerable<Order>> GetAllAsync();
    Task AddProductAsync(Order order);
    Task AddSeveralAsync(IEnumerable<Order> orders);
    Task UpdateAsync(Order order);
    Task UpdateSeveralAsync(IEnumerable<Order> orders);
    Task DeleteAsync(int id);
}

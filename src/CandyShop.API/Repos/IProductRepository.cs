using CandyShop.API.Models;
using CandyShop.API.Enums;
using Microsoft.EntityFrameworkCore;
namespace CandyShop.API.Repositories;

public interface IProductRepository
{
    Task<Product?> GetByIdAsync(int id);
    Task<IEnumerable<Product>> GetRangeFromAsync(int id, int count);
    Task<IEnumerable<Product>> GetByNameAsync(string name);
    Task<IEnumerable<Product>> GetByCategoryAsync(string category);
    Task<IEnumerable<Product>> GetAllAsync();
    Task<Product?> AddAsync(Product product);
    Task AddSeveralAsync(IEnumerable<Product> products);
    Task<int> UpdateAsync(Product product);
    Task UpdateAsync(IEnumerable<Product> products);
    Task<int> DeleteAsync(int id);
    void ChangeState(Product product, EntityState state);
}

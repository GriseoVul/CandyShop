using CandyShop.API.Models;
using CandyShop.API.Enums;
namespace CandyShop.API.Repositories;

public interface IProductRepository
{
    Task<Product?> GetByIdAsync(int id);
    Task<IEnumerable<Product>> GetRangeFromAsync(int id, int count);
    Task<IEnumerable<Product>> GetByNameAsync(string name);
    Task<IEnumerable<Product>> GetByCategoryAsync(ProductCategory category);
    Task<IEnumerable<Product>> GetAllAsync();
    Task AddAsync(Product product);
    Task AddSeveralAsync(IEnumerable<Product> products);
    Task UpdateAsync(Product product);
    Task UpdateAsync(IEnumerable<Product> products);
    Task DeleteAsync(int id);
}

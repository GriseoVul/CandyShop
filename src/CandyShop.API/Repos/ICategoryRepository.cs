using CandyShop.API.Models;
namespace CandyShop.API.Repos;

public interface ICategoryRepository
{
    Task<ProductCategory?> GetByIdAsync(int id);
    Task<ProductCategory?> GetByNameAsync(string name);
    Task<IEnumerable<ProductCategory>> GetAllAsync();
    Task<ProductCategory> AddAsync(String name);
    Task<ProductCategory?> UpdateAsync(ProductCategory order);
    Task<int> DeleteAsync(int id);
}

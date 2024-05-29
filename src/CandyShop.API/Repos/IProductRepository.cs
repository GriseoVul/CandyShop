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
    Task AddProductAsync(Product product);
    Task AddSeveralProductAsync(IEnumerable<Product> products);
    Task UpdateProductAsync(Product product);
    Task UpdateProductsAsync(IEnumerable<Product> products);
    Task DeleteProductAsync(int id);
}

using CandyShop.API.Models;
using CandyShop.API.Enums;
using CandyShop.API.DTOs;
namespace CandyShop.API.Services;

public interface IProductService
{
    Task<ProductDTO?> GetByIdAsync(int id);
    Task<ProductDTO?> GetByIdDetailAsync(int id);
    Task<IEnumerable<ProductDTO>> GetAllAsync();
    Task<IEnumerable<ProductDTO>> GetByCategoryAsync(ProductCategory category);
    Task<IEnumerable<ProductDTO>> GetByNameAsync(string name);

    Task CreateAsync(ProductDTO productDTO);
    Task UpdateAsync(ProductDTO productDTO);
    Task DeleteAsync(int id);
}

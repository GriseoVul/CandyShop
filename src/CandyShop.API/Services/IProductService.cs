using CandyShop.API.Models;
using CandyShop.API.Enums;
using CandyShop.API.DTOs;
namespace CandyShop.API.Services;

public interface IProductService
{
    Task<ProductDTO?> GetByIdAsync(int id);
    Task<ProductDTO?> GetByIdDetailAsync(int id);
    Task<IEnumerable<ProductDTO>> GetAllAsync();
    Task<IEnumerable<ProductDTO>> GetByCategoryAsync(string category);
    Task<IEnumerable<ProductDTO>> GetByNameAsync(string name);

    Task<int?> CreateAsync(ProductDTO productDTO);
    Task<int> UpdateAsync(ProductDTO productDTO);
    Task<int> DeleteAsync(int id);
}

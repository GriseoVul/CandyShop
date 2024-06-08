using CandyShop.API.Models;
using CandyShop.API.Enums;
using CandyShop.API.DTOs;
namespace CandyShop.API.Services;

public interface IProductService
{
    Task<ProductDTO?> GetByIdAsync(int id);
    Task<ProductDetailDTO?> GetByIdDetailAsync(int id);
    Task<IEnumerable<ProductDTO>> GetAllAsync();
    Task<IEnumerable<ProductDTO>> GetByCategoryAsync(ProductCategory category);
    Task<IEnumerable<ProductDTO>> GetByNameAsync(string name);

    Task<int?> CreateAsync(ProductDetailDTO productDTO);
    Task<int> UpdateAsync(ProductDetailDTO productDTO);
    Task<int> DeleteAsync(int id);
}

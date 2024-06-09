using CandyShop.API.Models;
using CandyShop.API.Enums;
using CandyShop.API.DTOs;
namespace CandyShop.API.Services;

public interface IProductService
{
    Task<ProductDTO?> GetByIdAsync(int id);
    Task<ProductDetailDTO?> GetByIdDetailAsync(int id);
    Task<IEnumerable<ProductDetailDTO>> GetAllAsync();
    Task<IEnumerable<ProductDetailDTO>> GetByCategoryAsync(ProductCategory category);
    Task<IEnumerable<ProductDetailDTO>> GetByNameAsync(string name);

    Task<int?> CreateAsync(ProductDetailDTO productDTO);
    Task<int> UpdateAsync(ProductDetailDTO productDTO);
    Task<int> DeleteAsync(int id);
}

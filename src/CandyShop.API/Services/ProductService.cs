using CandyShop.API.Models;
using CandyShop.API.Enums;
using CandyShop.API.DTOs;
using CandyShop.API.Repositories;
namespace CandyShop.API.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    public async Task<ProductDTO?> GetByIdAsync(int id)
    {
        Product? product =  await _productRepository.GetByIdAsync(id);
        if (product == null)
        {
            return null;
        }
        string imageName = product.Images.First().Name;
        IFormFile image = 
        ProductDTO dTO = new ProductDTO()
        {
            Id = product.Id,
            Name = product.Name,
            TitalPrice = product.TitalPrice,

        }
    }
    public async Task<ProductDTO> GetByIdDetailAsync(int id)
    {
        
    }
    public async Task<IEnumerable<ProductDTO>> GetAllAsync()
    {
        
    }
    public async Task<IEnumerable<ProductDTO>> GetByCategoryAsync(ProductCategory category)
    {
        
    }
    public async Task<IEnumerable<ProductDTO>> GetByNameAsync(string name)
    {
        
    }

    public async Task CreateAsync(ProductDTO productDTO)
    {
        
    }
    public async Task UpdateAsync(ProductDTO productDTO)
    {
        
    }
    public async Task DeleteAsync(int id)
    {
        
    }
}

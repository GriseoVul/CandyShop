using CandyShop.API.Models;
using CandyShop.API.Enums;
using CandyShop.API.DTOs;
using CandyShop.API.DTOs.Mappers;
using CandyShop.API.Repositories;
using CandyShop.API.Options;
using Microsoft.Extensions.Options;
using CandyShop.API.Repos;
using CandyShop.API.Helpers;
namespace CandyShop.API.Services;

public class ProductService(
    IProductRepository           repo, 
    IProductImageRepository      imageRepo,
    IWebHostEnvironment          environment, 
    IOptions<FileStorageOptions> options
    ) : IProductService
{
    private readonly IProductRepository _productRepository = repo;
    private readonly IProductImageRepository _productImageRepository = imageRepo;
    private readonly FileStorageOptions options = options.Value;
    private readonly IWebHostEnvironment _environment = environment;

    public async Task<ProductDTO?> GetByIdAsync(int id)
    {
        Product? product =  await _productRepository.GetByIdAsync(id);
        
        if (product == null)
        {
            return null;
        }
        return product.ToDTO();
    }
    public async Task<ProductDTO?> GetByIdDetailAsync(int id)
    {
        Product? product =  await _productRepository.GetByIdAsync(id);
        
        if (product == null)
        {
            return null;
        }
        
        return product.ToDTO();
    }
    public async Task<IEnumerable<ProductDTO>> GetAllAsync()
    {

        var Products = await _productRepository.GetAllAsync();

        return  Products.ToDTO();
    }
    public async Task<IEnumerable<ProductDTO>> GetByCategoryAsync(string category)
    {
        var Products = await _productRepository.GetByCategoryAsync(category);
        
        return Products.ToDTO();
    }
    public async Task<IEnumerable<ProductDTO>> GetByNameAsync(string name)
    {
        var Products = await _productRepository.GetByNameAsync(name);
        
        return Products.ToDTO();
    }

    public async Task<int?> CreateAsync(ProductDTO productDTO)
    {
        Product Result = productDTO.ToModel();

        List<ProductImage> images = [];
        foreach(var Name in productDTO.ImageNames)
        {
            ProductImage newImage = new()
            {
                Id = 0,
                Name = Name,
                ContentType = "image/jpeg",
                Product = Result
            };
            images.Add(newImage);
            
        }
        Result.Images = images;

        return (await _productRepository.AddAsync(Result))?.Id;
    }
    public async Task<int> UpdateAsync(ProductDTO productDTO)
    {
        Product Result = productDTO.ToModel();

        List<ProductImage> images = [];
        foreach(var Name in productDTO.ImageNames)
        {
            ProductImage newImage = new()
            {
                Id = 0,
                Name = Name,
                ContentType = "image/jpeg",
                ProductId = productDTO.Id
            };
            images.Add(newImage);
        }
        
        Result.Images = images;
        return await _productRepository.UpdateAsync(Result);
    }
    public async Task<int> DeleteAsync(int id)
    {
        return await _productRepository.DeleteAsync(id);
    }
}

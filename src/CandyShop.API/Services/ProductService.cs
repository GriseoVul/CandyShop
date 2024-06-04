using CandyShop.API.Models;
using CandyShop.API.Enums;
using CandyShop.API.DTOs;
using CandyShop.API.Repositories;
using CandyShop.API.Options;
using Microsoft.Extensions.Options;
namespace CandyShop.API.Services;

public class ProductService(
    IProductRepository           repo, 
    IWebHostEnvironment          environment, 
    IOptions<FileStorageOptions> options
    ) : IProductService
{
    private readonly IProductRepository _productRepository = repo;
    private readonly FileStorageOptions _options = options.Value;
    private readonly IWebHostEnvironment _environment = environment;

    public async Task<ProductDTO?> GetByIdAsync(int id)
    {
        Product? product =  await _productRepository.GetByIdAsync(id);
        
        if (product == null)
        {
            return null;
        }
        var ProductImagePath = Path.Combine(_environment.WebRootPath, _options.ProductStoragePath, product.Images.First().Name);
        if (!File.Exists(ProductImagePath))
            ProductImagePath = Path.Combine(_environment.WebRootPath, _options.ProductStoragePath,"placeholder.png");
        
        using var image = File.OpenRead(ProductImagePath);
        return new()
        {
            Id = product.Id,
            Name = product.Name,
            TitalPrice = product.TitalPrice,
            Image = new FormFile(image, 0, image.Length, product.Images.First().Name, product.Images.First().Name)
        };
    }
    public async Task<ProductDetailDTO?> GetByIdDetailAsync(int id)
    {
        Product? product =  await _productRepository.GetByIdAsync(id);
        
        if (product == null)
        {
            return null;
        }
        ICollection<IFormFile> images = [];

        foreach(var i in product.Images)
        {
            var ProductImagePath = Path.Combine(_environment.WebRootPath, _options.ProductStoragePath, i.Name);
            if (!File.Exists(ProductImagePath) )
                ProductImagePath = Path.Combine(_environment.WebRootPath, _options.ProductStoragePath, "placeholder.png");

            using var image = File.OpenRead(ProductImagePath);
            images.Add(new FormFile(image, 0, image.Length, i.Name, i.Name));
        }
        
        return new()
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            Discount = product.Discount,
            TitalPrice = product.TitalPrice,
            Category = product.Category.ToString(),
            Images = images
        };
    }
    public async Task<IEnumerable<ProductDTO>> GetAllAsync()
    {
        var Products = await _productRepository.GetAllAsync();
        var Result = new List<ProductDTO>();
        foreach (var Product in Products)
        {
            var ProductImagePath = Path.Combine(_environment.WebRootPath, _options.ProductStoragePath, Product.Images.First().Name);
            
            if (!File.Exists(ProductImagePath))
                ProductImagePath = Path.Combine(_environment.WebRootPath, _options.ProductStoragePath,"placeholder.png");
            
            using var image = File.OpenRead(ProductImagePath);

            Result.Add(
                new()
                {
                    Id = Product.Id,
                    Name = Product.Name,
                    TitalPrice = Product.TitalPrice,
                    Image = new FormFile(image, 0, image.Length, Product.Images.First().Name, Product.Images.First().Name)
            });
        }
        return Result;
    }
    public async Task<IEnumerable<ProductDTO>> GetByCategoryAsync(ProductCategory category)
    {
        var Products = await _productRepository.GetByCategoryAsync(category);

        var Result = new List<ProductDTO>();
        foreach (var Product in Products)
        {
            var ProductImagePath = Path.Combine(_environment.WebRootPath, _options.ProductStoragePath, Product.Images.First().Name);
            
            if (!File.Exists(ProductImagePath))
                ProductImagePath = Path.Combine(_environment.WebRootPath, _options.ProductStoragePath,"placeholder.png");
            
            using var image = File.OpenRead(ProductImagePath);

            Result.Add(
                new()
                {
                    Id = Product.Id,
                    Name = Product.Name,
                    TitalPrice = Product.TitalPrice,
                    Image = new FormFile(image, 0, image.Length, Product.Images.First().Name, Product.Images.First().Name)
            });
        }
        return Result;
    }
    public async Task<IEnumerable<ProductDTO>> GetByNameAsync(string name)
    {
        var Products = await _productRepository.GetByNameAsync(name);
        
        var Result = new List<ProductDTO>();
        foreach (var Product in Products)
        {
            var ProductImagePath = Path.Combine(_environment.WebRootPath, _options.ProductStoragePath, Product.Images.First().Name);
            
            if (!File.Exists(ProductImagePath))
                ProductImagePath = Path.Combine(_environment.WebRootPath, _options.ProductStoragePath,"placeholder.png");
            
            using var image = File.OpenRead(ProductImagePath);

            Result.Add(
                new()
                {
                    Id = Product.Id,
                    Name = Product.Name,
                    TitalPrice = Product.TitalPrice,
                    Image = new FormFile(image, 0, image.Length, Product.Images.First().Name, Product.Images.First().Name)
            });
        }
        return Result;
    }

    public async Task CreateAsync(ProductDTO productDTO)
    {
        throw new NotImplementedException();
    }
    public async Task UpdateAsync(ProductDTO productDTO)
    {
        throw new NotImplementedException();
    }
    public async Task DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}

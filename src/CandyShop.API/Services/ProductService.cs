using CandyShop.API.Models;
using CandyShop.API.Enums;
using CandyShop.API.DTOs;
using CandyShop.API.Repositories;
using CandyShop.API.Options;
using Microsoft.Extensions.Options;
using CandyShop.API.Repos;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
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
        return new()
        {
            Id = product.Id,
            Name = product.Name,
            TotalPrice = product.TotalPrice,
            ImageName = product.Images.First().Name
        };
    }
    public async Task<ProductDetailDTO?> GetByIdDetailAsync(int id)
    {
        Product? product =  await _productRepository.GetByIdAsync(id);
        
        if (product == null)
        {
            return null;
        }

        var images = await _productImageRepository.GetByProduct(product.Id);

        var result = new ProductDetailDTO()
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            Discount = product.Discount,
            TotalPrice = product.TotalPrice,
            Category = product.Category.ToString(),
            ImageNames = images.Select(x => x.Name).ToArray()
        };
        return result;
    }
    public async Task<IEnumerable<ProductDetailDTO>> GetAllAsync()
    {

        var Products = await _productRepository.GetAllAsync();
        var result = new List<ProductDetailDTO>();

        foreach (var product in Products)
        {
            var images = await _productImageRepository.GetByProduct(product.Id);
            var image = images.FirstOrDefault();
            var imageName = image?.Name ?? options.NoImageName;

            result.Add( new ProductDetailDTO()
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Discount = product.Discount,
                TotalPrice = product.TotalPrice,
                Category = product.Category.ToString(),
                ImageNames = images.Select(x => x.Name).ToArray()
            });
        }
        return result;
    }
    public async Task<IEnumerable<ProductDetailDTO>> GetByCategoryAsync(ProductCategory category)
    {
        var Products = await _productRepository.GetByCategoryAsync(category);
        
        var result = new List<ProductDetailDTO>();

        foreach (var product in Products)
        {
            var images = await _productImageRepository.GetByProduct(product.Id);
            var image = images.FirstOrDefault();
            var imageName = image?.Name ?? options.NoImageName;

            result.Add( new ProductDetailDTO()
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Discount = product.Discount,
                TotalPrice = product.TotalPrice,
                Category = product.Category.ToString(),
                ImageNames = images.Select(x => x.Name).ToArray()
            });
        }
        return result;
    }
    public async Task<IEnumerable<ProductDetailDTO>> GetByNameAsync(string name)
    {
        var Products = await _productRepository.GetByNameAsync(name);
        
        var result = new List<ProductDetailDTO>();

        foreach (var product in Products)
        {
            var images = await _productImageRepository.GetByProduct(product.Id);
            var image = images.FirstOrDefault();
            var imageName = image?.Name ?? options.NoImageName;

            result.Add( new ProductDetailDTO()
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Discount = product.Discount,
                TotalPrice = product.TotalPrice,
                Category = product.Category.ToString(),
                ImageNames = images.Select(x => x.Name).ToArray()
            });
        }
        return result;
    }

    public async Task<int?> CreateAsync(ProductDetailDTO productDTO)
    {
        if (!EnumHelper.TryGetProductCategory(productDTO.Category, out ProductCategory productCategory))
            productCategory = ProductCategory.Empty;
        
        Product Result = new()
        {
            Id = productDTO.Id,
            Name = productDTO.Name,
            Description = productDTO.Description,
            Count = 1,
            Price = productDTO.Price,
            Discount = productDTO.Discount,
            TotalPrice = productDTO.TotalPrice,
            Category = productCategory,
        };

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
    public async Task<int> UpdateAsync(ProductDetailDTO productDTO)
    {
        if (!EnumHelper.TryGetProductCategory(productDTO.Category, out ProductCategory productCategory))
            productCategory = ProductCategory.Empty;
        
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
        Product Result = new()
        {
            Id = productDTO.Id,
            Name = productDTO.Name,
            Description = productDTO.Description,
            Count = 1,
            Price = productDTO.Price,
            Discount = productDTO.Discount,
            TotalPrice = productDTO.TotalPrice,
            Category = productCategory,
            Images = images
        };
        return await _productRepository.UpdateAsync(Result);
    }
    public async Task<int> DeleteAsync(int id)
    {
        return await _productRepository.DeleteAsync(id);
    }
}

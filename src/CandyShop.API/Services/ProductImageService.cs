using CandyShop.API.Options;
using CandyShop.API.Repos;
using Microsoft.Extensions.Options;

namespace CandyShop.API.Services;

public class ProductImageService(
    IProductImageRepository repository,
    IOptions<FileStorageOptions> options,
    IWebHostEnvironment          environment
    ): IProductImageService
{
    protected IProductImageRepository _repository = repository;
    private readonly FileStorageOptions options = options.Value;
    private readonly IWebHostEnvironment _environment = environment;


    public async Task<Stream?> GetImage(string name)
    {
        var FilePath = Path.Combine(_environment.WebRootPath, options.ProductStoragePath, name);

        if (!Path.Exists(FilePath))
            return null;
        
        return new FileStream(FilePath, FileMode.Open, FileAccess.Read);
    }
    public async Task<int> CreateImage(int productId, string name, IFormFile image)
    {
        return -1;
    }
    public async Task<int> UpdateImage(int Id, string name, IFormFile image)
    {
        return -1;
    }
    public async Task<int> DeleteImage(int Id)
    {
        return -1;
    }
}

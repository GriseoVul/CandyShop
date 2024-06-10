namespace CandyShop.API.Services;

public interface IProductImageService
{
    Task<Stream?> GetImage(string name);
    Task<int> CreateImage(int productId, string name, IFormFile image);
    Task<int> UpdateImage(int Id, string name, IFormFile image);
    Task<int> DeleteImage(int Id);
}

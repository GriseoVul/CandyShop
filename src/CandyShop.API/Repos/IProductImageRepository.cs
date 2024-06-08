using CandyShop.API.Models;
namespace CandyShop.API.Repos;

/////////////////////////////////////////////////////////////////////////
/////////CAREFULLY! The code was written via ChatGPT/////////////////////
/////////////////////////////////////////////////////////////////////////
public interface IProductImageRepository
{
    Task<ProductImage?> GetByIdAsync(int id);
    Task<ICollection<ProductImage>> GetByProduct(int productId);
    Task<IEnumerable<ProductImage>> GetAllAsync();
    Task AddAsync(ProductImage productImage);
    Task UpdateAsync(ProductImage productImage);
    Task DeleteAsync(int id);
}

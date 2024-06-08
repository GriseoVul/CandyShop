using System.Data;
using CandyShop.API.Data;
using CandyShop.API.Models;
using Microsoft.EntityFrameworkCore;
namespace CandyShop.API.Repos;

/////////////////////////////////////////////////////////////////////////
/////////CAREFULLY! The code was written via ChatGPT/////////////////////
/////////////////////////////////////////////////////////////////////////
public class ProductImageRepository(ApplicationDbContext context) : IProductImageRepository
    {
        private readonly ApplicationDbContext _context = context;

    public async Task<ProductImage?> GetByIdAsync(int id)
        {
            return await _context.ProductImages.FindAsync(id);
        }
        public async Task<ICollection<ProductImage>> GetByProduct(int productId)
        {
            
            return await _context.ProductImages.Where(pI => pI.ProductId == productId).ToListAsync();
        }
        public async Task<IEnumerable<ProductImage>> GetAllAsync()
        {
            return await _context.ProductImages.ToListAsync();
        }

        public async Task AddAsync(ProductImage productImage)
        {
            _context.ProductImages.Add(productImage);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(ProductImage productImage)
        {
            _context.Entry(productImage).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var productImage = await _context.ProductImages.FindAsync(id);
            if (productImage != null)
            {
                _context.ProductImages.Remove(productImage);
                await _context.SaveChangesAsync();
            }
        }
    }
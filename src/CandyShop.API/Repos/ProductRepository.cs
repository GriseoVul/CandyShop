using CandyShop.API.Data;
using CandyShop.API.Models;
using CandyShop.API.Enums;
using Microsoft.EntityFrameworkCore;
namespace CandyShop.API.Repositories;

public class ProductRepository(ApplicationDbContext context) : IProductRepository
{
    private readonly ApplicationDbContext _context = context;
    public async Task<Product?> GetByIdAsync(int id)
    {
        return await _context.Products.Include(x => x.Images).FirstOrDefaultAsync(x => x.Id == id);
    }
    public async Task<IEnumerable<Product>> GetRangeFromAsync(int id, int count)
    {
        List<Product> result = await _context.Products.OrderBy(x => x.Id)
        .Where(x => x.Id >= id)
        .Take(count)
        .ToListAsync();

        return result;
    }
    public async Task<IEnumerable<Product>> GetByNameAsync(string name)
    {
        return await _context.Products.Where(p => p.Name == name).ToListAsync();
    }    
    public async Task<IEnumerable<Product>> GetByCategoryAsync(ProductCategory category)
    {
        List<Product> result = await _context.Products.Where(p => p.Category == category).ToListAsync();
        return result;
    }
    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await _context.Products.Take(100).ToListAsync();
    }
    public async Task<Product?> AddAsync(Product product)
    {
        var result = await _context.Products.AddAsync(product);
        
        await _context.SaveChangesAsync();
        return result.Entity;
    }    
    public async Task AddSeveralAsync(IEnumerable<Product> products)
    {
        await _context.Products.AddRangeAsync(products);
        await _context.SaveChangesAsync();
    }
    public async Task<int> UpdateAsync(Product product)
    {
        try
        {
            var existingProduct = await _context.Products.FindAsync(product.Id);
            if (existingProduct == null)
            {
                throw new Exception("null");
            }
            existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
            existingProduct.Count = product.Count;
            existingProduct.Price = product.Price;
            existingProduct.Discount = product.Discount;
            existingProduct.TotalPrice = product.TotalPrice;
            existingProduct.Category = product.Category;
            existingProduct.Images = product.Images;

            await _context.SaveChangesAsync();
            return existingProduct.Id;
        }
        catch (DbUpdateConcurrencyException)
        {
            // Логирование или обработка исключения
            return -1;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return -1;
        }
    }
    public async Task UpdateAsync(IEnumerable<Product> products)
    {
        try
        {
            foreach(var product in products)
            {
                var existingProduct = await _context.Products.FindAsync(product.Id);
                if (existingProduct != null)
                {
                    existingProduct.Name = product.Name;
                    existingProduct.Description = product.Description;
                    existingProduct.Count = product.Count;
                    existingProduct.Price = product.Price;
                    existingProduct.Discount = product.Discount;
                    existingProduct.TotalPrice = product.TotalPrice;
                    existingProduct.Category = product.Category;
                    existingProduct.Images = product.Images;
                }
            }
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            // Логирование или обработка исключения
            return;
        }
    }
    public async Task<int> DeleteAsync(int id)
    {
        try
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return -1;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return id;
        }
        catch(DbUpdateConcurrencyException)
        {
            return -1;
        }
    }
}

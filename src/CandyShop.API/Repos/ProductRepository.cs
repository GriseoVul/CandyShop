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
        return await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
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
        return await _context.Products.Take(300).ToListAsync();
    }
    public async Task AddAsync(Product product)
    {
        await _context.Products.AddAsync(product);
    }    
    public async Task AddSeveralAsync(IEnumerable<Product> products)
    {
        await _context.Products.AddRangeAsync(products);
    }
    public async Task UpdateAsync(Product product)
    {
        try
        {
            await _context.Products
                .Where(p => p.Id == product.Id)
                .ExecuteUpdateAsync( 
                    s => s.SetProperty(pr => pr.Name, product.Name)
                    .SetProperty(pr => pr.Description, product.Description)
                    .SetProperty(pr => pr.Count, product.Count)
                    .SetProperty(pr => pr.Price, product.Price)
                    .SetProperty(pr => pr.Discount, product.Discount)
                    .SetProperty(pr => pr.TitalPrice, product.TitalPrice)
                    .SetProperty(pr => pr.Category, product.Category)
                    .SetProperty(pr => pr.Images, product.Images)
                );
        }
        catch (DbUpdateConcurrencyException)
        {
            return;
        }
    }
    public async Task UpdateAsync(IEnumerable<Product> products)
    {
        try
        {
            foreach(var product in products)
            {
                await _context.Products
                .Where(p => p.Id == product.Id)
                .ExecuteUpdateAsync( 
                    s => s.SetProperty(pr => pr.Name, product.Name)
                    .SetProperty(pr => pr.Description, product.Description)
                    .SetProperty(pr => pr.Count, product.Count)
                    .SetProperty(pr => pr.Price, product.Price)
                    .SetProperty(pr => pr.Discount, product.Discount)
                    .SetProperty(pr => pr.TitalPrice, product.TitalPrice)
                    .SetProperty(pr => pr.Category, product.Category)
                    .SetProperty(pr => pr.Images, product.Images)
                );
            }
        }
        catch (DbUpdateConcurrencyException)
        {
            return;
        }
    }
    public async Task DeleteAsync(int id)
    {
        try
        {
            await _context.Products.Where(p => p.Id == id).ExecuteDeleteAsync();
        }
        catch(DbUpdateConcurrencyException)
        {
            return;
        }
    }
}

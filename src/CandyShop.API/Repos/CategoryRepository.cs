using CandyShop.API.Models;
using CandyShop.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;
namespace CandyShop.API.Repos;

public class CategoryRepository(ApplicationDbContext context) : ICategoryRepository
{
    protected ApplicationDbContext _context = context;
    public async Task<ProductCategory?> GetByIdAsync(int id)
    {
        return await _context.ProductCategories.FirstOrDefaultAsync(category => category.Id == id);
    }
    public async Task<ProductCategory?> GetByNameAsync(string name)
    {
        return await _context.ProductCategories.FirstOrDefaultAsync(category => category.Name == name);
    }
    public async Task<IEnumerable<ProductCategory>> GetAllAsync()
    {
        return await _context.ProductCategories.ToListAsync();
    }
    public async Task<ProductCategory> AddAsync(String name)
    {
        var existingProductCategory = await _context.ProductCategories.SingleOrDefaultAsync(cat => cat.Name == name );
        
        if (existingProductCategory == null)
        {
            existingProductCategory = (await _context.AddAsync(new ProductCategory { Name = name })).Entity;
            await _context.SaveChangesAsync();
        }
        
        return existingProductCategory;
    }
    public async Task<ProductCategory?> UpdateAsync(ProductCategory category)
    {   
        try
        {
            var existingProductCategory = await _context.ProductCategories.Where(cat => cat.Id == category.Id).FirstOrDefaultAsync() ?? throw new Exception($"Category with id: {category.Id} not found");
            existingProductCategory.Name = category.Name;
            await _context.SaveChangesAsync();
            return existingProductCategory;
        }
         catch (DbUpdateConcurrencyException)
        {
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return null;
        }
    }
    public async Task<int> DeleteAsync(int id)
    {
        var existingProductCategory = _context.ProductCategories.FirstOrDefault() ?? null;
        if (existingProductCategory == null) return -1;

        _context.ProductCategories.Remove(existingProductCategory);
        await _context.SaveChangesAsync();
        return id;
    }
}

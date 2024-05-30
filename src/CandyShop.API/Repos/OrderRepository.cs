using CandyShop.API.Models;
using CandyShop.API.Enums;
using CandyShop.API.Data;
using Microsoft.EntityFrameworkCore;
namespace CandyShop.API.Repos;

public class OrderRepository(ApplicationDbContext context) : IOrderRepository
{
    protected ApplicationDbContext _context = context;
    public async Task<Order?> GetByIdAsync(int id)
    {
        return await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);
    }
    public async Task<IEnumerable<Order>> GetRangeFromAsync(int id, int count)
    {
        return await _context.Orders
        .Where(x => x.Id == id)
        .Take(count)
        .ToListAsync();
    }
    public async Task UpdateStatus(int id,  OrderStatus status)
    {
        var order = await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);

        if(order == default)
        {
            return;
        }
        order.Status = status;
    }
    public async Task<IEnumerable<Order>> GetAllAsync()
    {
        return await _context.Orders.Take(300).ToArrayAsync();
    }    
    public async Task AddProductAsync(Order order)
    {
        await _context.Orders.AddAsync(order);
    }
    public async Task AddSeveralAsync(IEnumerable<Order> orders)
    {
        await _context.Orders.AddRangeAsync(orders);
    }
    public async Task UpdateAsync(Order order)
    {
        await _context.Orders
                .Where(p => p.Id == order.Id)
                .ExecuteUpdateAsync( 
                    s => s.SetProperty( or => or.Title, order.Title)
                    .SetProperty(or => or.PhoneNumber, order.PhoneNumber)
                    .SetProperty(or => or.Address, order.Address)
                    .SetProperty(or => or.Status, order.Status)
                );
    }
    public async Task UpdateSeveralAsync(IEnumerable<Order> orders)
    {
        try
        {
            foreach (var order in orders)
            {
                await _context.Orders
                .Where(p => p.Id == order.Id)
                .ExecuteUpdateAsync( 
                    s => s.SetProperty( or => or.Title, order.Title)
                    .SetProperty(or => or.PhoneNumber, order.PhoneNumber)
                    .SetProperty(or => or.Address, order.Address)
                    .SetProperty(or => or.Status, order.Status)
                );
            }
        }
        catch(DbUpdateConcurrencyException)
        {
            return ;
        }
    }
    public async Task DeleteAsync(int id)
    {
        try
        {
            await _context.Orders.Where(p => p.Id == id).ExecuteDeleteAsync();
        }
        catch(DbUpdateConcurrencyException)
        {
            return;
        }
    }
}

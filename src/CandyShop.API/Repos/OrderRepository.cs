using CandyShop.API.Models;
using CandyShop.API.Enums;
using CandyShop.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
namespace CandyShop.API.Repos;

public class OrderRepository(ApplicationDbContext context) : IOrderRepository
{
    protected ApplicationDbContext _context = context;
    public async Task<Order?> GetByIdAsync(int id)
    {
        return await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);
    }
    public async Task<Order?> UpdateStatusAsync(int id,  OrderStatus status)
    {
        var order = await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);

        if(order == default)
        {
            return null;
        }
        order.Status = status;

        return order;
    }
    public async Task<IEnumerable<Order>> GetAllAsync()
    {
        //feels good this is good practice  
        return await _context.Orders
        .Include(o => o.Items)
        .ThenInclude(oi => oi.Product)
        .OrderBy(x => x.Id)
        .Take(300)
        .ToArrayAsync();
    }    
    public async Task<Order> AddAsync(Order order)
    {
        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();
        
        return order;
    }
    public async Task<Order?> UpdateAsync(Order order)
    {
        try
        {
            var existingOrder = await _context.Orders.FindAsync(order.Id);
            if(existingOrder == null)
            {
                return null;
            }            
            
            existingOrder.CustomerName = order.CustomerName;
            existingOrder.CustomerPhoneNumber = order.CustomerPhoneNumber;
            existingOrder.CustomerAddress = order.CustomerAddress;
            existingOrder.AdditionalData = order.AdditionalData;
            existingOrder.Status = order.Status;

            return existingOrder;
        }
        catch(DbUpdateConcurrencyException)
        {
            return new Order(){ Id = -1};
        }
        catch(Exception)
        {
            return new Order(){ Id = -1};
        }
        
    }
    public async Task<int> DeleteAsync(int id)
    {
        var order = _context.Orders.Find(id);
        if(order == null)
        {
            return -1;
        }
        _context.Orders.Remove(order);
        
        try
        {
            await _context.SaveChangesAsync();
            return id;
        }
        catch(DbUpdateConcurrencyException)
        {
            return -1;
        }
    }
}

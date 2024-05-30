using CandyShop.API.Data;
using CandyShop.API.Models;
using Microsoft.EntityFrameworkCore;
namespace CandyShop.API.Repositories;

public class UserRepository(ApplicationDbContext context) : IUserRepository
{
    protected ApplicationDbContext _context = context;
    public async Task<User?> GetByIdAsync(int id)
    {
        return await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
    }
    public async Task<User?> GetByNameAsync(string name)
    {
        return await _context.Users.FirstOrDefaultAsync(x => x.Name == name);
    }
    public async Task<User?> GetByLoginAsync(string login)
    {
        return await _context.Users.FirstOrDefaultAsync(x => x.Login == login);
    }

    public async Task UpdateAsync(User user)
    {
        try   
        { 
            await _context.Users
                    .Where(p => p.Id == user.Id)
                    .ExecuteUpdateAsync( 
                        s => s.SetProperty( or => or.Name, user.Name)
                        .SetProperty(or => or.PhoneNumber, user.PhoneNumber)
                        .SetProperty(or => or.Email, user.Email)
                        .SetProperty(or => or.Role, user.Role)
                        .SetProperty(or => or.Avatar, user.Avatar)
                    );
        }
        catch(DbUpdateConcurrencyException )
        {
            return;
        }
    }
    public async Task DeleteAsync(int id)
    {
        try
        {
            await _context.Users.Where(p => p.Id == id).ExecuteDeleteAsync();
        }
        catch(DbUpdateConcurrencyException)
        {
            return;
        }
    }
}

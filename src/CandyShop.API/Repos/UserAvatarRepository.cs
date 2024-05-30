using CandyShop.API.Data;
using CandyShop.API.Models;
using Microsoft.EntityFrameworkCore;
namespace CandyShop.API.Repos;

/////////////////////////////////////////////////////////////////////////
/////////CAREFULLY! The code was written via ChatGPT/////////////////////
/////////////////////////////////////////////////////////////////////////
public class UserAvatarRepository(ApplicationDbContext context) : IUserAvatarRepository
    {
        private readonly ApplicationDbContext _context = context;

    public async Task<UserAvatar?> GetByIdAsync(int id)
        {
            return await _context.UserAvatars.FindAsync(id);
        }

        public async Task<IEnumerable<UserAvatar>> GetAllAsync()
        {
            return await _context.UserAvatars.ToListAsync();
        }

        public async Task AddAsync(UserAvatar userAvatar)
        {
            _context.UserAvatars.Add(userAvatar);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(UserAvatar userAvatar)
        {
            _context.Entry(userAvatar).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var userAvatar = await _context.UserAvatars.FindAsync(id);
            if (userAvatar != null)
            {
                _context.UserAvatars.Remove(userAvatar);
                await _context.SaveChangesAsync();
            }
        }
    }
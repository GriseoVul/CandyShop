using CandyShop.API.Models;
namespace CandyShop.API.Repos;

public interface IUserAvatarRepository
{
    Task<UserAvatar?> GetByIdAsync(int id);
    Task<IEnumerable<UserAvatar>> GetAllAsync();
    Task AddAsync(UserAvatar userAvatar);
    Task UpdateAsync(UserAvatar userAvatar);
    Task DeleteAsync(int id);
}
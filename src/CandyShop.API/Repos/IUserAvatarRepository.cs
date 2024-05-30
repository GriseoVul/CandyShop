using CandyShop.API.Models;
namespace CandyShop.API.Repos;

/////////////////////////////////////////////////////////////////////////
/////////CAREFULLY! The code was written via ChatGPT/////////////////////
/////////////////////////////////////////////////////////////////////////
public interface IUserAvatarRepository
{
    Task<UserAvatar?> GetByIdAsync(int id);
    Task<IEnumerable<UserAvatar>> GetAllAsync();
    Task AddAsync(UserAvatar userAvatar);
    Task UpdateAsync(UserAvatar userAvatar);
    Task DeleteAsync(int id);
}
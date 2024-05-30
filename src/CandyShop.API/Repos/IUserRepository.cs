using CandyShop.API.Models;
namespace CandyShop.API.Repositories;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(int id);
    Task<User?> GetByNameAsync(string name);
    Task<User?> GetByLoginAsync(string login);

    Task UpdateAsync(User user);
    Task DeleteAsync(int id);
}

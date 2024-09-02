using CandyShop.API.Models;
using CandyShop.API.Repos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CandyShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController(ICategoryRepository repo) : ControllerBase
    {
        private readonly ICategoryRepository repository = repo;

        [HttpGet]
        public async Task< ActionResult< IEnumerable< ProductCategory > > > GetAll()
        {
            var categories = await repository.GetAllAsync();
            if (categories == null) return NoContent();

            return Ok(categories);
        }
        [HttpGet("{id:int}")]
        public async Task< ActionResult< ProductCategory > > Get(int id)
        {
            var category = await repository.GetByIdAsync(id);
            if (category == null) return NoContent();
            
            return Ok(category);
        }
        [HttpGet("{name}")]
        public async Task< ActionResult< ProductCategory > > Get(String name)
        {
            var category = await repository.GetByNameAsync(name);
            if (category == null) return NoContent();
            
            return Ok(category);
        }

        [HttpPost]
        public async Task< ActionResult< ProductCategory > > Create(string name)
        {
            var category = await repository.AddAsync(name);
            if(category == null) return NoContent();
            return Ok(category);
        }
        [HttpDelete]
        public async Task< ActionResult< ProductCategory > > Delete(string name)
        {
            var category = await repository.GetByNameAsync($"{name}");
            if (category == null) return NoContent();

            await repository.DeleteAsync(category.Id);
            return Ok(category);            
        }

    }
}

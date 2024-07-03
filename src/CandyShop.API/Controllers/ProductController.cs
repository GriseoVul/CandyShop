using CandyShop.API.DTOs;
using CandyShop.API.Enums;
using CandyShop.API.Helpers;
using CandyShop.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CandyShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController 
    (IProductService service)
: ControllerBase
{
    private readonly IProductService _productService = service;

    [HttpGet]
    public async Task< ActionResult< IEnumerable< ProductDTO > > > GetAll()
    {
        var result = await _productService.GetAllAsync();
        if (result == null)
            return NotFound();

        return Ok( result );
    }

    [HttpPost("getDetail")]
    public async Task< ActionResult<ProductDTO> > GetByIdDetail([FromBody]int id)
    {
        var result = await _productService.GetByIdDetailAsync(id);
        if (result == null)
            return NotFound();

        return Ok( result );
    }

    [HttpPost("getByCategory")]
    public async Task< ActionResult< IEnumerable<ProductDTO> > > GetByCategory([FromBody] string category)
    {
        // if (!EnumHelper.TryGetProductCategory(category, out ProductCategory productCategory))
        //     return NotFound();

        var result = await _productService.GetByCategoryAsync(category);
        if (result == null)
            return NotFound();

        return Ok( result );
    }
    [HttpPost("getByName")]
    public async Task< ActionResult< IEnumerable<ProductDTO> > > GetByName([FromBody] string name)
    {
        
        var result = await _productService.GetByNameAsync(name);
        if (result == null)
            return NotFound();

        return Ok( result );
    }

    [HttpPost("create")]
    public async Task< ActionResult<int?> > Create(ProductDTO dTO )
    {
        var result = await _productService.CreateAsync(dTO);
        return Ok( result );
    }

    [HttpPut("update")]
    public async Task< ActionResult<int?> > Update(ProductDTO dTO )
    {
        var result = await _productService.UpdateAsync(dTO);
        if (result == -1) return NotFound();
        return Ok( result );
    }
    [HttpDelete("delete")]
    public async Task< ActionResult<ProductDTO> > Delete([FromBody]int id)
    {
        var result = await _productService.DeleteAsync(id);
        if (result == -1) return NotFound();
        return Ok( result );
    }
}

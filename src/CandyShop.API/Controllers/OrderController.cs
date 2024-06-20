using CandyShop.API.DTOs;
using CandyShop.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CandyShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController
    (IOrderService service)
 : ControllerBase
{

    private readonly IOrderService _orderService = service;

    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        var result = await _orderService.GetAllAsync();
        if (result == null)
            return NoContent();

        return Ok(result);
    }
    [HttpPost("create")]
    public async Task<IActionResult> PlaceOrder(OrderDTO dTO)
    {
        var result = await _orderService.PlaceNewOrder(dTO);
        if (result == null)
            return NotFound();
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> ChangeStatus(int id, [FromBody]string status)
    {
        var result = await _orderService.ChangeStatus(id, status);
        if (result == null)
            return NotFound();
        
        return Ok(result);
    }
}

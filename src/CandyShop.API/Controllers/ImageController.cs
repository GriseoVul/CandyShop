using CandyShop.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CandyShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImageController (IProductImageService service): ControllerBase
{
    private readonly IProductImageService _imageService = service;

    [HttpGet("{name}")]
    public async Task<IActionResult> Image(string name)
    {
        var imageStream = await _imageService.GetImage(name);

        if (imageStream == null)
            return NotFound();
        
        return File(imageStream, "image/jpeg");
    }
}

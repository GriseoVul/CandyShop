﻿namespace CandyShop.API.Models;

public class ProductImage
{
    public int Id { get; set; } = 0;
    public string Name { get; set; } = String.Empty;
    public string ContentType{ get; set; } = "image/jpeg";

    public int ProductId { get; set; } = 0;
    public Product Product { get; set; } = null!;
}

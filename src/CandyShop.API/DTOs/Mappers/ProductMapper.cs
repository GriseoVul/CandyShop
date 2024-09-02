using CandyShop.API.DTOs;
using CandyShop.API.Enums;
using CandyShop.API.Helpers;
using CandyShop.API.Models;

namespace CandyShop.API.DTOs.Mappers;

public static class ProductMapper
{
    public static ProductDTO ToDTO(this Product product)
    {
        var dto = new ProductDTO()
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Count = product.Count,
            Units = product.Units.ToString(),
            Price = product.Price,
            Discount = product.Discount,
            //old
            Category = product.Category.Name,
            ImageNames = product.Images.Select(x => x.Name).ToArray(),
        };
        
        return dto;
    }

    public static IEnumerable<ProductDTO> ToDTO(this IEnumerable<Product> products)
    {
        return products.Select(x => x.ToDTO() );
    }

    public static Product ToModel(this ProductDTO dto)
    {
        //TODO
        // if(!EnumHelper.TryGetProductCategory(dto.Category, out var category))
        // {
        //     category = ProductCategory.Empty;
        // }
        if(!EnumHelper.TryGetProductUnit(dto.Units, out var unit))
        {
            unit = ProductUnit.Empty;
        }

        var model = new Product()
        {
            Id = dto.Id,
            Name = dto.Name,
            Description = dto.Description,
            Count = dto.Count,
            Units = unit,
            Price = dto.Price,
            Discount = dto.Discount,
            //old
            //Category = category
        };

        return model;
    }

    public static IEnumerable<Product> ToModel(this IEnumerable<ProductDTO> products)
    {
        return products.Select(x => x.ToModel());
    }
}

using CandyShop.API.DTOs;
using CandyShop.API.Enums;
using CandyShop.API.Helpers;
using CandyShop.API.Models;

namespace CandyShop.API.DTOs.Mappers;

/// <summary>
/// Class <c> OrderMapper </c> provides simple methods for Order models to convert from <c> Order </c> to <c> OrderDTO </c> 
/// and opposite <c> OrderDTO </c> to <c> Order <c>
/// </summary>
public static class OrderMapper
{
    /// <summary>
    /// Method <c>ToDTO</c> converting model To DTO
    /// </summary>
    /// <param name="order">Input model</param>
    /// <returns> An object thaths represent data to send </returns>
    public static OrderDTO ToDTO(this Order order)
    {
        var dto = new OrderDTO()
        {
            Id = order.Id,
            CustomerName = order.CustomerName,
            CustomerPhoneNumber = order.CustomerPhoneNumber,
            CustomerAddress = order.CustomerAddress,
            AdditionalData = order.AdditionalData,
            Status = order.Status.ToString(),
            UserId = order.User?.Id ?? -1,
            UserName = order.User?.Name ?? "NoUser",
            Products = order.Items.Select( x => x.Product.ToDTO() ).ToList(),
        };
        
        return dto;
    }
    /// <summary>
    /// Method <c>ToDTO</c> converting model To DTO
    /// </summary>
    /// <param name="order">Input model</param>
    /// <returns> An object thaths represent data to send </returns>
    public static IEnumerable<OrderDTO> ToDTO(this IEnumerable<Order> orders)
    {
        return orders.Select(o => o.ToDTO());
    }

    /// <summary>
    /// Method <c>ToModel</c> converting DTO to model<
    /// !NO USER! and !NO PRODUCTS!
    /// </summary>
    /// <param name="dto">Input DTO</param>
    /// <returns>An object thaths represent order entity</returns>
    public static Order ToModel(this OrderDTO dto)
    {
        
        if (!EnumHelper.TryGetOrderStatus(dto.Status, out var status))
        {
            status = OrderStatus.Empty;
        }
        var model = new Order()
        {
            Id = dto.Id,
            CustomerName = dto.CustomerName,
            CustomerPhoneNumber = dto.CustomerPhoneNumber,
            CustomerAddress = dto.CustomerAddress,
            AdditionalData = dto.AdditionalData,
            Status = status,
            //TODO Нужно как-то находить пользователя...
            //Скорее всего внешне уже. 
            User = null!
            //TODO Плюс хз, нужно запрашивать же ещё продуктс
        };

        return model;
    }

    /// <summary>
    /// Method <c>ToModel</c> converting DTO to model
    /// !NO USER! and !NO PRODUCTS!
    /// </summary>
    /// <param name="dto">Input DTO</param>
    /// <returns>An object thaths represent order entity</returns>
    public static IEnumerable<Order> ToModel(this IEnumerable<OrderDTO> dto)
    {
        return dto.Select(o => o.ToModel());
    }
}

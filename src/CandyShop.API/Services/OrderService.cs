using CandyShop.API.DTOs;
using CandyShop.API.Enums;
using CandyShop.API.Helpers;
using CandyShop.API.Models;
using CandyShop.API.Options;
using CandyShop.API.Repos;
using CandyShop.API.Repositories;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.Extensions.Options;

namespace CandyShop.API.Services;

public class OrderService(
    IOrderRepository repo,
    IOptions<FileStorageOptions> options,
    IProductRepository prodRepo)
 : IOrderService
{
    private readonly IOrderRepository _repository = repo;
    private readonly IProductRepository _productRepository = prodRepo;
    private readonly FileStorageOptions options = options.Value;

    async Task<OrderDTO> MapOrder(Order order)
    {
        var orderDTO = new OrderDTO{
            Id = order.Id,
            Title = order.Title,
            PhoneNumber = order.PhoneNumber,
            Address = order.Address,
            Status = order.Status.ToString(),
            UserName = order.User.Name
        };

        foreach (var product in order.Products)
        {
            var existingProduct = await _productRepository.GetByIdAsync(product.Id);
            if (existingProduct == null)
                continue;

            orderDTO.Products.Add(
                new ProductDTO {
                    Id = product.Id,
                    Name = product.Name,
                    TotalPrice = product.TotalPrice,
                    ImageName = existingProduct.Images.FirstOrDefault()?.Name ?? options.NoImageName
                }
            );
        }

        return orderDTO;
    }

    async Task<Order> MapOrderDTO(OrderDTO order)
    {
        var User = new User() { 
            Name = order.UserName,
            PhoneNumber = order.PhoneNumber
        };

        if(!EnumHelper.TryGetOrderStatus(order.Status, out OrderStatus orderStatus))
            orderStatus = OrderStatus.Empty;
        
        var result = new Order{
            Id = order.Id,
            Title = order.Title,
            PhoneNumber = order.PhoneNumber,
            Address = order.Address,
            Status = orderStatus,
            User = User
        };

        foreach (var productDto in order.Products)
        {
            //TODO
            //сомнительно НО ОКЭЙ
            //Вероятно переделать нада
            var existingProduct = await _productRepository.GetByIdAsync(productDto.Id);
            if (existingProduct == null)
                continue;
            result.Products.Add(existingProduct);
        }
        return result;
    }

    public async Task<IEnumerable<OrderDTO>> GetAllAsync()
    {
        var orders = await _repository.GetAllAsync();
        var result = new List<OrderDTO>();
        foreach(var order in orders)
        {
            result.Add(await MapOrder(order));
        }
        return result;
    }
    public async Task<OrderDTO> PlaceNewOrder(OrderDTO order)
    {
        var newOrder = await _repository.AddAsync( await MapOrderDTO( order ) );

        return await MapOrder( newOrder );
    }

    public async Task<OrderDTO?> ChangeStatus(int id, string status)
    {
        if(!EnumHelper.TryGetOrderStatus(status, out OrderStatus orderStatus))
            orderStatus = OrderStatus.Empty;

        var order = await _repository.UpdateStatusAsync(id, orderStatus);
        
        if(order == null)
            return new OrderDTO(){Id = -1};
        
        OrderDTO result = await MapOrder(order);
        
        return result;
    }
}

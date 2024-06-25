using CandyShop.API.DTOs;
using CandyShop.API.Enums;
using CandyShop.API.Helpers;
using CandyShop.API.DTOs.Mappers;
using CandyShop.API.Options;
using CandyShop.API.Repos;
using CandyShop.API.Repositories;
using CandyShop.API.Models;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;

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

    public async Task<IEnumerable<OrderDTO>> GetAllAsync()
    {
        var orders = await _repository.GetAllAsync();

        var result = orders.ToDTO();
        
        return result;
    }
    public async Task<OrderDTO> PlaceNewOrder(OrderDTO order)
    {
        var model = order.ToModel();

        model.User = new User()
        {
            Id = order.UserId,
            Name = order.CustomerName,
            PhoneNumber = order.CustomerPhoneNumber,
            Role = UserRole.Anonimus,
            Avatar = null!
        };
        //TODO Добавить перенесение продуктов с DTO в модель

        foreach(var item in order.Products)
        {
            if (!EnumHelper.TryGetProductUnit(item.Units, out var unit))
                unit = ProductUnit.Empty;
            
            var prod = await _productRepository.GetByIdAsync(item.Id);

            if (prod == null)
            {
                throw new Exception($"Product with {item.Id} not existing!");
            }

            model.Items.Add( new OrderItem() { 
                Id = 0,
                ProductId = item.Id,
                Product = prod,
                ProductQuantity = item.Count,
                Unit = unit,
                OrderId = model.Id
                });
            _productRepository.ChangeState(prod, EntityState.Unchanged);
        }
        
        var newOrder = await _repository.AddAsync( model );

        return newOrder.ToDTO();
    }

    public async Task<OrderDTO?> ChangeStatus(int id, string status)
    {
        if(!EnumHelper.TryGetOrderStatus(status, out OrderStatus orderStatus))
            orderStatus = OrderStatus.Empty;

        var order = await _repository.UpdateStatusAsync(id, orderStatus);
        
        if(order == null)
            return new OrderDTO(){Id = -1};
        
        OrderDTO result = order.ToDTO();
        
        return result;
    }
}

﻿using CandyShop.API.Enums;

namespace CandyShop.API.Models;

public class User
{
    public int Id { get; set; } = 0;
    public string Name { get; set; } = String.Empty;
    public string Login { get; set; } = String.Empty;
    public string HashPassword{ get; set; } = String.Empty;
    public string PhoneNumber { get; set; } = String.Empty;
    public string Email { get; set; } = String.Empty;
    public UserRole Role { get; set; } = UserRole.Anonimus;
 
    public UserAvatar Avatar { get; set; } = null!;
    public ICollection<Order> Orders{ get; set; } = [];
}

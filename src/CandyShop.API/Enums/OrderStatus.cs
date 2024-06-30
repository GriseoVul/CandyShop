namespace CandyShop.API.Enums;

public enum OrderStatus
{
    Empty,
    Created,  //новый
    Pending, // в работе
    IncorrectData, //Неверные данные
    Canseled, // Отменён
    Shipped, // Отправлен
    Delivered // Завершён
}

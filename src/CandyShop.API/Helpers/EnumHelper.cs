using CandyShop.API.Enums;


namespace CandyShop.API.Helpers;

public static class EnumHelper
{
    public static ProductCategory GetProductCategory(string name)
    {
        return (ProductCategory)Enum.Parse(typeof(ProductCategory), name, true);
    }
    public static bool TryGetProductCategory(string category, out ProductCategory result)
    {
        return Enum.TryParse(category, out result);
    }
    public static bool TryGetOrderStatus(string status, out OrderStatus result)
    {
        return Enum.TryParse(status, out result);
    }
}

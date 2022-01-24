using EpamTaxiAngular.Models;

namespace EpamTaxiAngular.ViewModels
{
    public static class OrderProfile
    {
        public static OrderViewModel Map(this Order order, User user)
        {

            return new OrderViewModel
            {
                OrderId = order.OrderId,
                FullName = order.FullName,
                ContactNumber = user != null ? user.ContactNumber : string.Empty,
                OrderDate = order.OrderDate,
                CarDeliveryTime = order.CarDeliveryTime,
                FromLocation = order.FromLocation,
                ToLocation = order.ToLocation,
                Cost = order.Cost,
                Status = order.Status
            };
        }
        public static Order Map(this OrderViewModel orderModel, User user)
        {
            return new Order
            {
                OrderId = orderModel.OrderId,
                FullName = orderModel.FullName,
                OrderDate = orderModel.OrderDate,
                CarDeliveryTime = orderModel.CarDeliveryTime,
                ToLocation = orderModel.ToLocation,
                FromLocation = orderModel.FromLocation,
                Cost = orderModel.Cost,
                Status = orderModel.Status,
                User = user,
                UserId = user.Id
            };
        }
    }
}

using EpamTaxiAngular.Models;
using EpamTaxiAngular.Data;
using System.Linq;

namespace EpamTaxiAngular
{
    public static class SampleData
    {
        public static void Initialize(TaxiContext context)
        {
            if (!context.Users.Any())
            {
                var Ivan = new User
                {
                    UserName = "ivan@mail.ru",
                    ContactNumber = "123",
                };
                context.Users.Add(Ivan);
                context.Orders.Add(
                    new Order
                    {
                        UserName = "Иван",
                        //OrderDate = System.DateTime.Now,
                        //CarDeliveryTime = System.TimeSpan.Zero,
                        //FromLocation = "Пункт А",
                        //ToLocation = "Пункт Б",
                        Cost = 0
                        //Status = "Новый",                        
                        //User = Ivan
                    }
                );
                context.SaveChanges();
            }
        }
    }
}

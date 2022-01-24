using EpamTaxiAngular.Models;
using EpamTaxiAngular.Data;
using System.Linq;
using Microsoft.AspNetCore.Identity;

namespace EpamTaxiAngular
{
    public static class SampleData
    {
        public static void Initialize(TaxiContext context)
        {
            if (!context.Users.Any())
            {

                PasswordHasher<User> passwordHasher = new PasswordHasher<User>();
                var Ivan = new User
                {
                    UserName = "ivan@mail.ru",
                    NormalizedUserName = "IVAN@MAIL.RU",
                    ContactNumber = "1234567890",
                    Email = "ivan@mail.ru",
                    NormalizedEmail = "IVAN@MAIL.RU"
                };
                Ivan.PasswordHash = passwordHasher.HashPassword(Ivan, "abc123");

                context.Users.Add(Ivan);

                var IvanAdmin = new IdentityUserRole<string>()
                {
                    RoleId = context.Roles.FirstOrDefault(r => r.Name == "Administrator").Id,
                    UserId = Ivan.Id
                };

                context.UserRoles.Add(IvanAdmin);
                
                context.Orders.Add(
                    new Order
                    {
                        FullName = "Иванов Иван Иванович",
                        OrderDate = System.DateTime.Now,
                        CarDeliveryTime = System.DateTime.Now,
                        FromLocation = "Пункт А",
                        ToLocation = "Пункт Б",
                        Cost = 50,
                        Status = 0,
                        User = Ivan
                    }
                );
                context.SaveChanges();
            }
        }
    }
}

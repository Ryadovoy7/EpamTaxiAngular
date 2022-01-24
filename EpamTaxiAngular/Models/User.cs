using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EpamTaxiAngular.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            Orders = new HashSet<Order>();
        }

        public string ContactNumber { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}

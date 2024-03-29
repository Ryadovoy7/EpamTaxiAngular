﻿using System;

namespace EpamTaxiAngular.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public string FullName { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime? CarDeliveryTime { get; set; }
        public string FromLocation { get; set; }
        public string ToLocation { get; set; }
        public decimal Cost { get; set; }
        public int Status { get; set; }

        public string UserId { get; set; }
        public virtual User User { get; set; }
    }
}

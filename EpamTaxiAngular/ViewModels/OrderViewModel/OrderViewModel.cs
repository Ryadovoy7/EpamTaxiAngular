using System;
using System.ComponentModel.DataAnnotations;

namespace EpamTaxiAngular.ViewModels
{
    public class OrderViewModel
    {
        public int OrderId { get; set; }
        [Required(ErrorMessage = "Требуется ФИО")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "Требуется контактный номер")]
        public string ContactNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime? CarDeliveryTime { get; set; }    
        [Required(ErrorMessage = "Требуется начальная точка")]
        public string FromLocation { get; set; }
        [Required(ErrorMessage = "Требуется конечная точка")]
        public string ToLocation { get; set; }
        [Required(ErrorMessage = "Требуется рассчитать стоимость поездки")]
        public decimal Cost { get; set; }
        public int Status { get; set; }
    }
}

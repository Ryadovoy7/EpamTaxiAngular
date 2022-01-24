using System.ComponentModel.DataAnnotations;

namespace EpamTaxiAngular.ViewModels
{
    public class RegisterRequestViewModel
    {
        [Required]
        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Контактный номер")]
        public string ContactNumber { get; set; }

        [Required]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Электронная почта")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "{0} должно быть длиной минимум {2} и максимум {1} символов.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace EpamTaxiAngular.Models
{
    public class AuthRequestModel
    {
        [Required(ErrorMessage = "Требуется электронная почта.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Требуется пароль.")]
        public string Password { get; set; }
    }
}

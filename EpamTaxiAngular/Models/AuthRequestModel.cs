using System.ComponentModel.DataAnnotations;

namespace EpamTaxiAngular.Models
{
    public class AuthRequestModel
    {
        [Required(ErrorMessage = "Email is required.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }
    }
}

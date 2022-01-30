using System.Collections.Generic;

namespace EpamTaxiAngular.ViewModels
{
    public class RegisterResponseViewModel
    {
        public bool IsSuccessfulRegistration { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}

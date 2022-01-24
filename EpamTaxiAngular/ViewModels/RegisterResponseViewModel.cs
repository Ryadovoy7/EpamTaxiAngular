using System.Collections.Generic;

namespace EpamTaxiAngular.ViewModels
{
    public class RegisterResponseViewModel
    {
        //public string Id { get; set; }
        //public string Email { get; set; }
        //public string ContactNumber { get; set; }

        //public RegisterResponseViewModel(User user)
        //{
        //    Id = user.Id;
        //    Email = user.Email;
        //    ContactNumber = user.ContactNumber;
        //}

        public bool IsSuccessfulRegistration { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}

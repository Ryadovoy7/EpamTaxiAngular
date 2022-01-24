using EpamTaxiAngular.JwtFeatures;
using EpamTaxiAngular.Models;
using EpamTaxiAngular.ViewModels;
using IdentityServer4;
using IdentityServer4.Events;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace EpamTaxiAngular.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly JwtHandler _jwtHandler;

        public AccountController( 
            UserManager<User> userManager, 
            JwtHandler jwtHandler)
        {
            _userManager = userManager;
            _jwtHandler = jwtHandler;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = new User { UserName = model.Email, ContactNumber = model.ContactNumber, Email = model.Email };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);
                return BadRequest(new RegisterResponseViewModel { Errors = errors });
            }

            await _userManager.AddToRoleAsync(user, "User");

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthRequestModel userForAuthentication)
        {
            var user = await _userManager.FindByNameAsync(userForAuthentication.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, userForAuthentication.Password))
                return Unauthorized(new AuthResponseModel { ErrorMessage = "Invalid Authentication" });
            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = await _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new AuthResponseModel { IsAuthSuccessful = true, Token = token });
        }
    }
}

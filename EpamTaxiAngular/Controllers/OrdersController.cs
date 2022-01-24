using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using EpamTaxiAngular.Models;
using EpamTaxiAngular.Data;
using EpamTaxiAngular.ViewModels;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System;

namespace EpamTaxiAngular.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/orders")]
    public class OrdersController : Controller
    {
        TaxiContext db;
        public OrdersController(TaxiContext context)
        {
            db = context;
        }
        [HttpGet]
        public IActionResult Get()
        {
            if (User.HasClaim(m => m.Type == ClaimTypes.Role && m.Value == "Administrator"))
                return Ok(db.Orders
                    .Select(o => o.Map(o.User))
                    .ToList());

            string userName = User.FindFirst(ClaimTypes.Name)?.Value;
            if (string.IsNullOrEmpty(userName))
                return Unauthorized();
            var user = db.Users.FirstOrDefault(u => u.UserName == userName);
            if (user == null)
                return Unauthorized();

            List<OrderViewModel> orderModels = db.Orders
                .Where(o => o.User == user)
                .Select(o => o.Map(o.User))
                .ToList();

            return Ok(orderModels);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var order = db.Orders
                .Where(x => x.OrderId == id);

            if (order.Count() == 0)
                return NotFound();

            if (!CheckRightsForOrder(order.First()))
                return Forbid();

            return Ok(order.Select(o => o.Map(o.User)).FirstOrDefault());
        }

        [HttpPost]
        public IActionResult Post(OrderViewModel orderModel)
        {
            if (ModelState.IsValid)
            {
                string userName = User.FindFirst(ClaimTypes.Name)?.Value;
                if (string.IsNullOrEmpty(userName))
                    return BadRequest();
                var user = db.Users.FirstOrDefault(u => u.UserName == userName);
                if (user == null)
                    return BadRequest();
                db.Orders.Add(orderModel.Map(user));
                user.ContactNumber = orderModel.ContactNumber;
                db.Update(user);
                db.SaveChanges();
                return Ok(orderModel);
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        [Route("calculate")]
        public IActionResult Calculate(OrderViewModel orderModel)
        {
            if (ModelState.IsValid)
            {
                orderModel.Cost = CalculateOrderCost(orderModel);
                return Ok(orderModel.Cost);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(OrderViewModel orderModel)
        {
            if (ModelState.IsValid)
            {
                string userName = User.FindFirst(ClaimTypes.Name)?.Value;
                if (string.IsNullOrEmpty(userName))
                    return BadRequest();
                var user = db.Users.FirstOrDefault(u => u.UserName == userName);
                if (user == null)
                    return BadRequest();

                orderModel.Cost = CalculateOrderCost(orderModel);
                var order = orderModel.Map(user);
                if (!CheckRightsForOrder(order))
                    return Forbid();

                user.ContactNumber = orderModel.ContactNumber;
                db.Update(order);
                db.Update(user);
                db.SaveChanges();
                return Ok(orderModel);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrator")]
        public IActionResult Delete(int id)
        {
            Order order = db.Orders.FirstOrDefault(x => x.OrderId == id);
            if (order != null)
            {
                if (!CheckRightsForOrder(order))
                    return Forbid();

                db.Orders.Remove(order);
                db.SaveChanges();
            }

            return Ok(order);
        }

        [HttpGet]
        [Authorize]
        [Route("cancel/{id}")]

        public IActionResult Cancel(int id)
        {
            Order order = db.Orders.FirstOrDefault(x => x.OrderId == id);
            if (order != null)
            {
                if (!CheckRightsForOrder(order))
                    return Forbid();

                order.Status = (int)OrderStatus.Canceled;
                db.Update(order);
                db.SaveChanges();
            }

            return Ok();
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [Route("confirm/{id}")]
        public IActionResult Confirm(int id)
        {
            Order order = db.Orders.FirstOrDefault(x => x.OrderId == id);
            if (order != null)
            {
                if (!CheckRightsForOrder(order))
                    return Forbid();

                order.Status = (int)OrderStatus.Confirmed;
                db.Update(order);
                db.SaveChanges();
            }

            return Ok();
        }

        private bool CheckRightsForOrder(Order order)
        {
            if (User.HasClaim(m => m.Type == ClaimTypes.Role && m.Value == "Administrator"))
                return true;

            string userId = User.FindFirst(ClaimTypes.Name)?.Value;
            var user = db.Users.FirstOrDefault(u => u.UserName == userId);
            return user == order.User;
        }

        private decimal CalculateOrderCost(OrderViewModel order)
        {
            var rng = new Random();
            return (decimal)rng.NextDouble() * 1850 + 150;
        }
    }
}
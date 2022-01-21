using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using EpamTaxiAngular.Models;
using EpamTaxiAngular.Data;

namespace EpamTaxiAngular.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class ProductController : Controller
    {
        TaxiContext db;
        public ProductController(TaxiContext context)
        {
            db = context;
            if (!db.Orders.Any())
            {
                db.Orders.Add(new Order { UserName = "Иван", Cost = 25 });
                db.Orders.Add(new Order { UserName = "Сергей", Cost = 32 });
                db.Orders.Add(new Order { UserName = "Михаил", Cost = 56 });
                db.SaveChanges();
            }
        }
        [HttpGet]
        public IEnumerable<Order> Get()
        {
            return db.Orders.ToList();
        }

        [HttpGet("{id}")]
        public Order Get(int id)
        {
            Order order = db.Orders.FirstOrDefault(x => x.OrderId == id);
            return order;
        }

        [HttpPost]
        public IActionResult Post(Order order)
        {
            if (ModelState.IsValid)
            {
                db.Orders.Add(order);
                db.SaveChanges();
                return Ok(order);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(Order order)
        {
            if (ModelState.IsValid)
            {
                db.Update(order);
                db.SaveChanges();
                return Ok(order);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Order order = db.Orders.FirstOrDefault(x => x.OrderId == id);
            if (order != null)
            {
                db.Orders.Remove(order);
                db.SaveChanges();
            }
            return Ok(order);
        }
    }
}
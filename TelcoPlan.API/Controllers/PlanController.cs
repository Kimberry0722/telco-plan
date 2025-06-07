using Microsoft.AspNetCore.Mvc;
using TelcoPlan.API.Constants;

namespace TelcoPlan.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlanController : ControllerBase
    {
        private static readonly List<Plan> Plans = new()
        {
            new Plan { Id = 1, Name = "Kim Prepaid 55", Type = PlanType.PREPAID.ToString(), DataLimit = "UNLIMITED INTERNET", DataSpeed = "UNCAPPED SPEED", Currency = "RM", Price = 55, Validity = "30 days", Descriptions = new() { "Uncapped Speed ALL DAY", "Unlimited calls with Hotspot" } },
            new Plan { Id = 2, Name = "Kim Prepaid 40", Type = PlanType.PREPAID.ToString(), DataLimit = "UNLIMITED INTERNET", DataSpeed = "12Mbps",  Currency = "RM", Price = 40, Validity = "30 days", Descriptions = new() { "Uncapped Speed for 5G Network from 8pm-8am", "Unlimited calls with Hotspot" } },
            new Plan { Id = 3, Name = "Kim Prepaid 12", Type = PlanType.PREPAID.ToString(), DataLimit = "UNLIMITED INTERNET", DataSpeed = "6Mbps", Currency = "RM", Price = 12, Validity = "7 days", Descriptions = new() { "Uncapped Speed for 5G Network from 8pm-8am", "Unlimited calls with Hotspot" } },
            new Plan { Id = 4, Name = "Kim Postpaid 45", Type = PlanType.POSTPAID.ToString(), DataLimit = "100GB 5G", Currency = "RM", Price = 45, Validity = "", Descriptions = new() { "Unlimited high-speed hotspot", "Unlimited HD calls and SMS" } },
            new Plan { Id = 5, Name = "Kim Postpaid 70", Type = PlanType.POSTPAID.ToString(), DataLimit = "300GB 5G", Currency = "RM", Price = 70, Validity = "", Descriptions = new() { "Unlimited high-speed hotspot", "Unlimited HD calls and SMS" , "Free Roaming" } },
            new Plan { Id = 6, Name = "Kim Postpaid 60", Type = PlanType.POSTPAID.ToString(), DataLimit = "200GB 5G", Currency = "RM", Price = 60, Validity = "", Descriptions = new() { "Unlimited high-speed hotspot", "Unlimited HD calls and SMS" } },
            new Plan { Id = 7, Name = "Kim Postpaid 30", Type = PlanType.POSTPAID.ToString(), DataLimit = "4GB 5G", Currency = "RM", Price = 30, Validity = "", Descriptions = new() { "Unlimited HD calls and SMS" } }            
        };

        [HttpGet]
        public ActionResult<IEnumerable<Plan>> GetAll()
        {
            var summaries = Plans.Select(p => new PlanSummaryDto
            {
                Id = p.Id,
                Name = p.Name,
                Type = p.Type,
                DataLimit = p.DataLimit,
                DataSpeed = p.DataSpeed,
                Currency = p.Currency,
                Price = p.Price,
                Validity = p.Validity
            });

            return Ok(summaries);
        }

        [HttpGet("{id}")]
        public ActionResult<Plan> GetById(int id)
        {
            var plan = Plans.FirstOrDefault(p => p.Id == id);
            if (plan == null)
            {
                return NotFound(new { message = $"Plan with ID {id} not found." });
            }
            return Ok(plan);
        }
    }
}

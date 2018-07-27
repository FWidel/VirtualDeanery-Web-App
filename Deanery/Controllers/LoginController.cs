using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deanery.Entities;
using Deanery.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Deanery.Controllers
{
    public class LoginController : Controller
    {
        private DbDeaneryContext db = new DbDeaneryContext();
        [Route("api/user/login")]
        // [HttpPost]
        public IActionResult LoginMethod()
        {
            string id = "Jakis", password = "JD";

            var login = db.Student.Where(p => p.Lastname == id&& p.Password == password);
            if (login.Count()!=0 )       
             return Ok("Good");          
            else
             return Ok("Bad");
        }


    }
}
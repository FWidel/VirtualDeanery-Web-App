using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deanery.Entities;
using Deanery.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Deanery.Controllers
{
    public class LoginController : Controller
    {
        private DbDeaneryContext db = new DbDeaneryContext();
        [Route("api/user/login")]
        [HttpPost]
        public IActionResult LoginMethod([FromBody]ClassLogin user)
        {
           

            var login = db.Student.Where(p => p.Login == user.Login&& p.Password == user.Password);
            if (login.Count() != 0)
            {
                HttpContext.Session.SetString("Login", user.Login);
               
                return Ok(HttpContext.Session.GetString("Login"));

            }
            else
                return Ok("Invalid Login or Password");
        }


    }
}
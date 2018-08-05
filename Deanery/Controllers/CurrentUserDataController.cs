using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deanery.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Deanery.Controllers
{
    public class CurrentUserDataController : Controller
    {
        private DbDeaneryContext db = new DbDeaneryContext();
        [Route("api/user/get-current")]
        [HttpPost]
        public IActionResult Index()
        {
           
            
            var login = HttpContext.Session.GetString("Login");
            var currentUser = db.Student.Where(c => c.Login ==login);        
           
            return Ok(currentUser);
        }
    }
}
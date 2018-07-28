using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deanery.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Deanery.Controllers
{
    
    public class StudentAllData : Controller
    {
        private DbDeaneryContext db = new DbDeaneryContext();

        

        [Route("api/user/get-all")]
        public IActionResult Index()
        {
            //HttpContext.Session.SetString("Login", "The Doctor");
            var students = db.Student.Where(c => true);
            var login = HttpContext.Session.GetString("Login");

            if(login == null)
            {
                return Redirect("~/login");

            }
            return Ok(students);
        }
    }
}

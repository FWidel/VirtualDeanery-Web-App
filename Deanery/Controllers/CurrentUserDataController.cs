using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Deanery.Entities;
using Deanery.Models;
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
            var query =
                        from Onestudent in db.Student
                        where Onestudent.Login == login
                        select Onestudent;
            JSONLoginImage prop = new JSONLoginImage();
            foreach (Student Onestudent in query)
            {
                prop.Login = Onestudent.Login;
                prop.Email = Onestudent.Email;
                prop.Firstname = Onestudent.Firstname;
                prop.Id = Onestudent.Id;             
                prop.Lastname = Onestudent.Lastname;
                prop.Pesel = Onestudent.Pesel;
                prop.Phone = Onestudent.Phone;
                prop.Surname = Onestudent.Surname;

                if (Onestudent.Image != null)
                    prop.Image = Encoding.ASCII.GetString(Onestudent.Image);
                else
                    prop.Image = "No image";
                return Ok(prop);
            }

            return Ok("notFound");


            
        }
    }
}
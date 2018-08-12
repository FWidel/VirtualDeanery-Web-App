using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Deanery.Entities;
using Deanery.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Deanery.Controllers
{
    public class GetUserInfoController : Controller
    {
        private DbDeaneryContext db = new DbDeaneryContext();
       

        [Route("api/user/get-current-user")]
        [HttpPost]
        public IActionResult getCurrentInformationBar(JSONStudent prop)
        {
            var login = HttpContext.Session.GetString("Login");

            var query =
                        from Onestudent in db.Student
                        where Onestudent.Login == login
                        select Onestudent;
            foreach (Student Onestudent in query)
            {
                prop.Login = Onestudent.Login;
                if (Onestudent.Image != null)
                    prop.Image = Encoding.ASCII.GetString(Onestudent.Image);               
                else
                    prop.Image = "No image";
                return Ok(prop);
            }

            return Ok("notFound");
        }

           
        [Route("api/user/check-authorization")]
        [HttpPost]
        public IActionResult checkAuthorization()
        {


            var login = HttpContext.Session.GetString("Login");
           
            if (login != null)
                return Ok("true");
            else
                return Ok("false");

        }


        [Route("api/user/get-all")]
        [HttpGet]
        public IActionResult getAllStudents()
        {
            
            var students = db.Student.Where(c => true);
            var login = HttpContext.Session.GetString("Login");
            if (login == null)
            {
                return Ok("Unauthorized session");

            }
            return Ok(students);
        }

        [Route("api/user/get-current")]
        [HttpPost]
        public IActionResult getCurrentInformationUser()
        {
            var login = HttpContext.Session.GetString("Login");
            var query =
                        from Onestudent in db.Student
                        where Onestudent.Login == login
                        select Onestudent;
            JSONStudent prop = new JSONStudent();
            foreach (Student Onestudent in query)
            {
                prop.Login = Onestudent.Login;
                prop.Email = Onestudent.Email;
                prop.Firstname = Onestudent.Firstname;
                prop.Id = Onestudent.StudentId;
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
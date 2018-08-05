using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Deanery.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Deanery.Controllers
{
    public class InformationAboutUserController : Controller
    {
        private DbDeaneryContext db = new DbDeaneryContext();
        [Route("api/user/change-password")]
        [HttpPost]
        public IActionResult ChangePass([FromQuery]string pass)
        {

            bool status = false;
            var login = HttpContext.Session.GetString("Login");

            var query =
                        from Onestudent in db.Student
                        where Onestudent.Login == login
                        select Onestudent;
            foreach (Student ord in query)
            {
                ord.Password = pass;
                status = true;

            }
            db.SaveChanges();
            if (status)
                return Ok("Success");
            else
                return Ok("Error");
        }

        [Route("api/user/get-current-user")]
        [HttpPost]
        public IActionResult Login()
        {
            var login = HttpContext.Session.GetString("Login");

            var query =
                        from Onestudent in db.Student
                        where Onestudent.Login == login
                        select Onestudent;
            foreach (Student Onestudent in query)
            {
                return Ok(Onestudent.Login);
            }
            return Ok("notFound");
        }

        [Route("api/user/change-firstname")]
        [HttpGet]
        public IActionResult ChangeName([FromQuery]Student student)
        {
            bool status = false;
            var login = HttpContext.Session.GetString("Login");
            Regex PeselRegex = new Regex(@"[0-9]{11}");
            Regex PhoneNumberRegex = new Regex(@"[0-9]");
            Regex EmailRegex = new Regex(@"^[a-z][a-z0-9_-]*@[a-z0-9]*\.[a-z]{2,3}$");
            if (!PeselRegex.IsMatch(student.Pesel))
                return Ok("Invalid PESEL");
            if (!PhoneNumberRegex.IsMatch(student.Phone))
                return Ok("Invalid Phone");
            if (!EmailRegex.IsMatch(student.Email))
                return Ok("Invalid Email");

            var query =
                        from Onestudent in db.Student
                        where Onestudent.Login == login
                        select Onestudent;
            foreach (Student ord in query)
            {
                ord.Firstname = student.Firstname;
                ord.Lastname = student.Lastname;
                ord.Surname = student.Surname;
                ord.Pesel = student.Pesel;
                ord.Phone = student.Phone;

                status = true;
            }
            db.SaveChanges();
            if (status)
                return Ok("Success");
            else
                return Ok("Error");
        }

        [Route("api/user/get-image")]
        [HttpPost]
        public IActionResult getImage([FromBody] byte[] image)
        {
            var login = HttpContext.Session.GetString("Login");
            bool status = false;
            var query =
                        from Onestudent in db.Student
                        where Onestudent.Login == login
                        select Onestudent;
            foreach (Student Onestudent in query)
            {
                Onestudent.Image = image;
                status = true;
            }
            if(status)
            return Ok("Success");
            else
                return Ok("Image isn't being add");

        }
    }
}
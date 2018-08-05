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
        [HttpPost]
        public IActionResult ChangeName([FromBody]string property)
        {
            bool status = false;
            var login = HttpContext.Session.GetString("Login");

            var query =
                        from Onestudent in db.Student
                        where Onestudent.Login == login
                        select Onestudent;
            foreach (Student ord in query)
            {
                ord.Firstname = property;
                status = true;

            }
            db.SaveChanges();
            if (status)
                return Ok("Success");
            else
                return Ok("Error");
        }


        [Route("api/user/change-pesel")]
        [HttpGet]
        public IActionResult ChangePESEL([FromQuery]string PESEL)
        {
            bool status = false;
            var login = HttpContext.Session.GetString("Login");
            Regex PeselRegex = new Regex(@"[0-9]{11}");
            if (PeselRegex.IsMatch(PESEL))
            {              
                var query =
                            from Onestudent in db.Student
                            where Onestudent.Login == login
                            select Onestudent;
                foreach (Student ord in query)
                {
                    ord.Pesel = PESEL;
                    status = true;
                }
                db.SaveChanges();
            }
            if (status)
                return Ok("Success");
            else
                return Ok("Invalid PESEL");
        }

        [Route("api/user/change-phone")]
        [HttpGet]
        public IActionResult ChangePhone([FromQuery]string Phone)
        {

            bool status = false;
            var login = HttpContext.Session.GetString("Login");
            Regex PhoneNumberRegex = new Regex(@"[0-9]");
            if (PhoneNumberRegex.IsMatch(Phone))
            {
                var query =
                            from Onestudent in db.Student
                            where Onestudent.Login == login
                            select Onestudent;
                foreach (Student ord in query)
                {
                    ord.Phone = Phone;
                    status = true;
                }
                db.SaveChanges();
            }
            if (status)
                return Ok("Success");
            else
                return Ok("Invalid Phone");

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
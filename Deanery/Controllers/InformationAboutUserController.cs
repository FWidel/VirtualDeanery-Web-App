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
        public IActionResult Login(JSONLoginImage prop)
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

        [Route("api/user/change-firstname")]
        [HttpPost]
        public IActionResult ChangeName([FromBody]JSONData property)
        {

            bool status = false;
            var login = HttpContext.Session.GetString("Login");

            var query =
                        from Onestudent in db.Student
                        where Onestudent.Login == login
                        select Onestudent;
            foreach (Student ord in query)
            {
                ord.Firstname = property.Property;
                status = true;

            }
            db.SaveChanges();
            if (status)
                return Ok("Success");
            else
                return Ok("Error");
        }


        [Route("api/user/change-pesel")]
        [HttpPost]
        public IActionResult ChangePESEL([FromBody]JSONData property)
        {
            bool status = false;
            var login = HttpContext.Session.GetString("Login");
            Regex PeselRegex = new Regex(@"[0-9]{11}");
            if (PeselRegex.IsMatch(property.Property))
            {              
                var query =
                            from Onestudent in db.Student
                            where Onestudent.Login == login
                            select Onestudent;
                foreach (Student ord in query)
                {
                    ord.Pesel = property.Property;
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
        [HttpPost]
        public IActionResult ChangePhone([FromBody]JSONData property)
        {

            bool status = false;
            var login = HttpContext.Session.GetString("Login");
            Regex PhoneNumberRegex = new Regex(@"[0-9]");
            if (PhoneNumberRegex.IsMatch(property.Property))
            {
                var query =
                            from Onestudent in db.Student
                            where Onestudent.Login == login
                            select Onestudent;
                foreach (Student ord in query)
                {
                    ord.Phone = property.Property;
                    status = true;
                }
                db.SaveChanges();
            }
            if (status)
                return Ok("Success");
            else
                return Ok("Invalid Phone");

        }
        [Route("api/user/change-email")]
        [HttpPost]
        public IActionResult ChangeEmail([FromBody]JSONData property)
        {
            bool status = false;
            var login = HttpContext.Session.GetString("Login");
            Regex EmailRegex = new Regex(@"^[a-z][a-z0-9_-]*@[a-z0-9]*\.[a-z]{2,3}$");


            if (!EmailRegex.IsMatch(property.Property))
                return Ok("Invalid email");


            var query =
                        from Onestudent in db.Student
                        where Onestudent.Login == login
                        select Onestudent;
            foreach (Student ord in query)
            {
                ord.Email = property.Property;
                status = true;

            }
            db.SaveChanges();
            if (status)
                return Ok("Success");
            else
                return Ok("Error");
        }
        [Route("api/user/change-surname")]
        [HttpPost]
        public IActionResult ChangeSurname([FromBody]JSONData property)
        {
            bool status = false;
            var login = HttpContext.Session.GetString("Login");

            var query =
                        from Onestudent in db.Student
                        where Onestudent.Login == login
                        select Onestudent;
            foreach (Student ord in query)
            {
                ord.Surname = property.Property;
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
        public IActionResult getImage([FromBody]JSONLoginImage property)
        {
           

            var login = HttpContext.Session.GetString("Login");
            bool status = false;
            var query =
                        from Onestudent in db.Student
                        where Onestudent.Login == login
                        select Onestudent;
            foreach (Student Onestudent in query)
            {
    
                    Onestudent.Image = Encoding.ASCII.GetBytes(property.Image);
                
                status = true;
            }
            db.SaveChanges();
            if (status)
                return Ok("Success");
            else
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
    }
}
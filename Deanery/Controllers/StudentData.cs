using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Deanery.Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Deanery.Controllers
{
    public class StudentData : Controller
    {
        private DbDeaneryContext db = new DbDeaneryContext();

        [Route("api/user/register")]
        [HttpPost]
        public IActionResult AddStudentData([FromBody]Student student)
        {

            var login = db.Student.Where(p => p.Login == student.Login).Count();
            var email = db.Student.Where(p => p.Email == student.Email).Count();
            if (login != 0)
                return Ok("This login is already taken");

            if (email != 0)
                return Ok("This email is already taken");


            string secretKey = "6LfUQ2gUAAAAAJ-GJa5h0RG25-GQhVKqOV6qkJbN";
            var client = new WebClient();
            var result = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secretKey, Captcha));
            var obj = JObject.Parse(result);
            var status = (bool)obj.SelectToken("success");
            ViewBag.Message = status ? "Google reCaptcha validation success" : "Google reCaptcha validation failed";

            db.Student.Add(student);
            db.SaveChanges();
            return Ok("Successfully registered");

        }

    }
}
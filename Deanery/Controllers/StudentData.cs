using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
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
        public IActionResult AddStudentData([FromQuery] string captcha, [FromBody]Student student)
        {

            Regex EmailRegex = new Regex(@"^[a-z][a-z0-9_-]*@[a-z0-9]*\.[a-z]{2,3}$");
            Regex PhoneNumberRegex = new Regex(@"[0-9]");

            if (!EmailRegex.IsMatch(student.Email))
                return Ok("Invalid email");
            else if (!PhoneNumberRegex.IsMatch(student.Phone))
                return Ok("Invalid phone");
            else
            {
                var login = db.Student.Where(p => p.Login == student.Login).Count();
                var email = db.Student.Where(p => p.Email == student.Email).Count();
                
                if (login != 0)
                    return Ok("This login is already taken");

                if (email != 0)
                    return Ok("This email is already taken");
                string secretKey = "6LfUQ2gUAAAAAJ-GJa5h0RG25-GQhVKqOV6qkJbN";
                var client = new WebClient();
                var result = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secretKey, captcha));
                var obj = JObject.Parse(result);
                var status = (bool)obj.SelectToken("success");
                if (status)
                {
                    db.Student.Add(student);
                    db.SaveChanges();
                    return Ok("Successfully registered");
                }
                else
                    return Ok("Google reCaptcha validation failed");
            }
           
           

        }

    }
}
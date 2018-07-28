using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deanery.Entities;
using Microsoft.AspNetCore.Mvc;

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
            
            db.Student.Add(student);
            db.SaveChanges();
            return Ok("Successfully registered");

        }

    }
}
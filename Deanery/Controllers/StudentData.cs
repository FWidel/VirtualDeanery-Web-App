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
            
            Student newStudent = new Student()
            {
                Firstname = student.Firstname,
                Lastname = student.Lastname,
                Surname = student.Surname,
                Pesel = student.Pesel,
                Phone = student.Phone,
                Email = student.Email,
                Password = student.Password,
                Login = student.Login


            };
            db.Student.Add(newStudent);
            db.SaveChanges();
            return Ok("Successfully add into database");

        }

    }
}
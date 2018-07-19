using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deanery.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Deanery.Controllers
{
    public class StudentController : Controller
    {
        private DbDeaneryContext db = new DbDeaneryContext();
        public IActionResult Index()
        {
            var customer = db.Student.FirstOrDefault();
            return View(customer);
        }
      

        [Route("api/registration")]
        [HttpPost]
        public IActionResult AddStudentData([FromBody]Student student)
        {
            var customer = db.Student.FirstOrDefault();
            Student newStudent = new Student()
            {
                Firstname = student.Firstname,
                Lastname = student.Lastname,
                Surname = student.Surname,
                Pesel = student.Pesel,
                Phone = student.Phone,
                Email = student.Email,
                Password = student.Password


            };
            db.Student.Add(newStudent);
            db.SaveChanges();
            return View();

        }

    }
}
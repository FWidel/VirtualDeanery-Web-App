using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Deanery.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Deanery.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            DbDeaneryContext db = new DbDeaneryContext();
        Student newStudent = new Student()
            {
                Firstname = "Arek",
                Lastname = "Jakis",
                Surname = "Pichurski",
                Pesel = "12345678901",
                Phone = "1123",
                Email = "sss@o2.pl",
                Password = "haslo"


            };
            db.Student.Add(newStudent);
            db.SaveChanges();
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}

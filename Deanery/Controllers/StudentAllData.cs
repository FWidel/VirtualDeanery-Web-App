using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deanery.Entities;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Deanery.Controllers
{
    
    public class StudentAllData : Controller
    {
        private DbDeaneryContext db = new DbDeaneryContext();

        

        [Route("api/student/get-all")]
        public IActionResult Index()
        {
            var students = db.Student.Where(c => true);

            return Ok(students);
        }
    }
}

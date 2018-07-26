using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deanery.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Deanery.Controllers
{
    public class PrintAllDataStudentController : Controller
    {
        private DbDeaneryContext db = new DbDeaneryContext();
        [Route("api/user/showdata")]    
        public IActionResult DeleteStudentData()
        {


            var coustomers = db.Student.Where(c => true);
            return Ok(coustomers);

        }
    }
}
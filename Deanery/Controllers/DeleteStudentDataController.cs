using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deanery.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Deanery.Controllers
{
    public class DeleteStudentDataController : Controller
    {
        
        private DbDeaneryContext db = new DbDeaneryContext();

        [Route("api/user/delete")]
        [HttpPost]
        public IActionResult DeleteStudentData([FromBody]Student student)
        {

            
            return Ok("Successfully deleted from database");

        }
    }
}
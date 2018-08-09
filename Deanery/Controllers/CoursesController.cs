using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deanery.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Deanery.Controllers
{
    public class CoursesController : Controller
    {
        private DbDeaneryContext db = new DbDeaneryContext();

        [Route("api/add/course")]
        [HttpPost]
        public IActionResult DeleteStudentData([FromBody]Course OneCourse)
        {
            try
            {
                db.Course.Add(OneCourse);
                db.SaveChanges();
                return Ok("Successfully registered");
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
            db.SaveChanges();

            return Ok("Successfully deleted from database");

        }


    }
}
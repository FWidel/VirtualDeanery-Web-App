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
        public IActionResult CreateNewCourse([FromBody]Course course)
        {
           

            try
            {
                db.Course.Add(course);
                db.SaveChanges();
                return Ok("Successfully added course");
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }

        }
    }
}
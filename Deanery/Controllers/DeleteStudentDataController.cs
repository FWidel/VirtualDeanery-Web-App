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
        public IActionResult DeleteStudentData([FromBody]int Id)
        {
            try
            {
                Student student = new Student();
                student.Id = Id;
                db.Student.Remove(student);
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
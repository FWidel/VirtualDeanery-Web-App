using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deanery.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Deanery.Controllers
{
    public class CurrentUserDataController : Controller
    {
        private DbDeaneryContext db = new DbDeaneryContext();
        [Route("api/user/get-current")]
        [HttpPost]
        public Student Index()
        {        
            var login = HttpContext.Session.GetString("Login");
            var query =
                        from Onestudent in db.Student
                        where Onestudent.Login == login
                        select Onestudent;
            foreach (Student ord in query)           
                return ord;
            
            return null;
        }
    }
}
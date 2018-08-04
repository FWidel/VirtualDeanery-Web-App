using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deanery.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Deanery.Controllers
{
    public class LogoutUserController : Controller
    {
       
        [Route("api/user/logout")]       
        public IActionResult LogoutMethod()
        {

            HttpContext.Session.Remove("Login");

            return Ok(HttpContext.Session.GetString("Login"));
        }
    }
}
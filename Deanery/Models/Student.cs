using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deanery.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Surname { get; set; }
        public string Pesel { get; set; }
        public int? Phone { get; set; }
    }
}

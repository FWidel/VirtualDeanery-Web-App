using System;
using System.Collections.Generic;

namespace Deanery.Entities
{
    public partial class Student
    {
        public Student()
        {
            StudentCourses = new HashSet<StudentCourses>();
        }

        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Surname { get; set; }
        public string Pesel { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Login { get; set; }
        public byte[] Image { get; set; }

        public ICollection<StudentCourses> StudentCourses { get; set; }
    }
}

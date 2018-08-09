using System;
using System.Collections.Generic;

namespace Deanery.Entities
{
    public partial class Course
    {
        public Course()
        {
            StudentCourses = new HashSet<StudentCourses>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Desciption { get; set; }
        public string Difflculty { get; set; }

        public ICollection<StudentCourses> StudentCourses { get; set; }
    }
}

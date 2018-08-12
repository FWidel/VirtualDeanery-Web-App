using System;
using System.Collections.Generic;

namespace Deanery.Entities
{
    public partial class Course
    {
        public Course()
        {
            CourseStudent = new HashSet<CourseStudent>();
        }

        public int CourseId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Difficulty { get; set; }
        public string Password { get; set; }
        public int? LeaderId { get; set; }

        public ICollection<CourseStudent> CourseStudent { get; set; }
    }
}

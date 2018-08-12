using System;
using System.Collections.Generic;

namespace Deanery.Entities
{
    public partial class CourseStudent
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int CourseId { get; set; }

        public Course Course { get; set; }
        public Student Student { get; set; }
    }
}

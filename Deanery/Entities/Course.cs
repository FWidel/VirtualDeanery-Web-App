using System;
using System.Collections.Generic;

namespace Deanery.Entities
{
    public partial class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Difficulty { get; set; }
        public string Password { get; set; }
        public int LeaderId { get; set; }
    }
}

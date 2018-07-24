using Deanery.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deanery.Repository
{
    public class DBInitializer
    {
        private DeaneryDB _context;

        public DBInitializer(DeaneryDB context)
        {
            _context = context;

        }
        public Student Add(Student student)
        {
            _context.Students.Add(student);
            _context.SaveChanges();
            return student;
        }
        public IEnumerable<Student> GetAll()
        {
            return _context.Students.OrderBy(r => r.Surname);
        }
    }
}

using Deanery.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deanery.Repository
{
    public class DeaneryDB: DbContext
    {

        public DeaneryDB(DbContextOptions options):base(options)
        {

        }

        public DbSet<Student> Students { get; set; }
        

    }
}

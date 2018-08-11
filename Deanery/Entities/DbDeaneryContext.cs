using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Deanery.Entities
{
    public partial class DbDeaneryContext : DbContext
    {
        public virtual DbSet<Course> Course { get; set; }
        public virtual DbSet<CourseStudent> CourseStudent { get; set; }
        public virtual DbSet<Student> Student { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Data Source=DESKTOP-SE8O521;Initial Catalog=DbDeanery;Integrated Security=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>(entity =>
            {
                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnType("text");

                entity.Property(e => e.Difficulty)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Leader)
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password).IsUnicode(false);
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.Property(e => e.Email)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Firstname)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Image).HasColumnType("image");

                entity.Property(e => e.Lastname)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Login)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Password).IsUnicode(false);

                entity.Property(e => e.Pesel)
                    .IsRequired()
                    .HasColumnName("PESEL")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });
        }
    }
}

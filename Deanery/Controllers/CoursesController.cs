using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deanery.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Deanery.Controllers
{


    public class CoursesController : Controller
    {
        private DbDeaneryContext db = new DbDeaneryContext();

        [Route("api/add/course")]
        [HttpGet]
        public IActionResult CreateNewCourse()
        {

            Course course = new Course();
            course.Description = "asddsa";
            course.Difficulty = "hard";
            course.Name = "dsad";
            try
            {
                db.Course.Add(course);
                db.SaveChanges();
                return Ok("Successfully added course");
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }

        }


        [Route("api/add/studentcourse")]
        [HttpGet]
        public IActionResult AddStudentToCourse([FromQuery]string NameCourse)
        {
            CourseStudent studentcourse = ExtractedStudentCourse(NameCourse);

            try
            {
                db.CourseStudent.Add(studentcourse);
                db.SaveChanges();
                return Ok("Successfully added student to course");
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }

        }


        [Route("api/delete/studentcourse")]
        [HttpGet]
        public IActionResult RemoveStudentCourse([FromQuery]string NameCourse)
        {
            CourseStudent studentcourse = ExtractedStudentCourse(NameCourse);

            try
            {
                db.CourseStudent.Remove(studentcourse);
                db.SaveChanges();
                return Ok("Successfully removed student to course");
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }

        }

        private CourseStudent ExtractedStudentCourse(string NameCourse)
        {

            var student = HttpContext.Session.GetString("Login");
            var queryStudent =
                        from Onestudent in db.Student
                        where Onestudent.Login == student
                        select Onestudent;



            CourseStudent studentcourse = new CourseStudent();

            foreach (Student Onestudent in queryStudent)
            {
                studentcourse.StudentId = Onestudent.Id;


            }
            var queryCourse =
                        from onecourse in db.Course
                        where onecourse.Name == NameCourse
                        select onecourse;
            foreach (Course onecourse in queryCourse)
            {
                studentcourse.CourseId = onecourse.Id;

            }
            
            

                var queryStudentCourse =
                            from oneStudentCourse in db.CourseStudent
                            where oneStudentCourse.StudentId == studentcourse.StudentId && oneStudentCourse.CourseId == studentcourse.CourseId
                            select  oneStudentCourse.Id;

                foreach (int onestudentcourse in queryStudentCourse)
                {
                    studentcourse.Id = onestudentcourse;

                }
            

            return studentcourse; 
        }
    }
}
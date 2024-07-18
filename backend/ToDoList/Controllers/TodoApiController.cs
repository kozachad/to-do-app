using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using ToDoList.Models;
using ToDoList.Utils;
using ToDoList.DTOs;
using System.Diagnostics;
using TodoList.Utils;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ToDoList.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoApiController : ControllerBase
    {
        private readonly AMCDbContext db;
        private readonly ILogger<TodoApiController> _logger;
        private readonly IWebHostEnvironment _env;
        public TodoApiController(ILogger<TodoApiController> logger, AMCDbContext dbContext, IWebHostEnvironment env)
        {
            db = dbContext;
            _logger = logger;
            _env = env;
        }

        [HttpGet]
        [Route("activities/user/")]
        [Authorize(Roles = "user")]
        public IActionResult GetRealId(int RealId)
        {
            var activities = db.Activities
                .Where(a=> a.RealId == RealId && a.isDeleted == false)
                .OrderBy(a => a.DueDate)
                .Select(s => s)
                .ToList();
            if (!activities.Any()) return NoContent();
            return Ok(activities);
        }

        [HttpGet]
        [Route("activities/getid/")]
        //[Authorize(Roles = "user")]
        public IActionResult Get(int id)
        {
            
            var activity = db.Activities.Where(s => s.Id == id).Select(s => s);
            if (!activity.Any()) return NotFound();
            return Ok(activity);
        }

        [HttpPost]
        [Route("activities")]
        [Authorize(Roles = "user")]
        public IActionResult Post([FromBody] ActivityDTO Dto)
        {

            Models.Activity activity = new Models.Activity();
            activity.Name = Dto.Name;
            activity.DueDate = Dto.DueDate;
            activity.RealId = Dto.RealId;
            activity.isDeleted = false;
            //activity.RealId = Dto.RealId;
            db.Activities.Add(activity);
            db.SaveChanges();
            LogEvents.LogToFile("Activity", "Post" + "\n" + "Name: " + Dto.Name + "\n" + "DueDate: " + Dto.DueDate + "\n" + "Posted By (RealId): " + Dto.RealId, _env);

            return StatusCode(201);

        }

        [HttpPut]
        [Route("activities/edit/")]
        [Authorize(Roles = "user")]
        public IActionResult Put([FromBody] ActivityDTO Dto, int id)
        {
            
            var activity = db.Activities.Where(s => s.Id == id).Select(s => s);
            if (!activity.Any()) return NotFound();
            var td = activity.First();
            //td.Id = id;
            td.Name = Dto.Name;
            td.DueDate = Dto.DueDate;
            db.SaveChanges();
            LogEvents.LogToFile("Activity", "Edit" + "\n" + "Name: " + Dto.Name + "\n" + "DueDate: " + Dto.DueDate, _env);

            return Ok();
        }

        [HttpDelete]
        [Route("activities/delete/")]
        [Authorize(Roles = "user")]
        public IActionResult Delete(int id)
        {
            
            var activity = db.Activities.Find(id);
            //db.Activities.Remove(activity);
            activity.isDeleted = true;
            db.SaveChanges();
            LogEvents.LogToFile("Activity", "Delete" + "\n" + "ID: " + id, _env);

            return Ok();
        }

        [HttpPost]
        [Route("tokens")]
        public IActionResult Login([FromBody] AccountDTO Dto)
        {
            if (Dto.userid == null || Dto.password == null) return BadRequest();
            
            var user = db.Users.Where(s => s.Id == Dto.userid).Select(s => s);
            if (!user.Any()) return Unauthorized();
            var u = user.First();
            

            // check password with hash function
            bool isVerified = HashFunction.CheckPassword(Dto.password, u.Salt, u.Password);
            if (!isVerified) return Unauthorized();


            // send token if the username and password is true
            var token = JWTAuthentication.GenerateJwtToken(Dto.userid);

            RealTokenDTO RealToken = new RealTokenDTO();  // YENİ
            RealToken.Token = token;
            RealToken.RealId = u.RealId;
            //return StatusCode(201, new { token = token });
            return StatusCode(201, RealToken);
        }

        [HttpPost]
        [Route("signup")]
        public IActionResult SignUp([FromBody] AccountDTO Dto)
        {
            (string salt, string hash) hashedAndSalt = HashFunction.CreateHashAndSalt(Dto.password);
            string salt = hashedAndSalt.salt;
            string hash = hashedAndSalt.hash;

            
            db.Users.Add(new User()
            {
                Id = Dto.userid,
                Password = hash,
                Salt = salt,
            });

            db.SaveChanges();
            LogEvents.LogToFile("New User", "New User Created" + "\n" + "Username: " + Dto.userid + "\n" + "PasswordHash: " + hash, _env);
            return StatusCode(201);
        }

    }
}
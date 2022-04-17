using AutoMapper;
using DVers.Data.Models;
using DVers.DTOs.Input;
using DVers.DTOs.Output;
using DVers.Services.Helpers;
using DVers.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVers.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UsersController(IUserService userService, IMapper mapper)
        {
            this._userService = userService ?? throw new ArgumentNullException(nameof(userService));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public IActionResult Index()
        {
            if (!Logged.IsLogged())
            {
                return Unauthorized();
            }

            var users = this._userService.GetUsers();
            var usersView = new List<UserViewModel>();
            foreach (var user in users)
            {
                usersView.Add(this._mapper.Map<UserViewModel>(user));
            }

            return new JsonResult(usersView);
        }

        [HttpGet("{id}")]
        public IActionResult UserDetails(int id)
        {
            if (!Logged.IsLogged())
            {
                return Unauthorized();
            }

            var user = this._userService.GetUser(id);

            if (user == null)
            {
                return NotFound();
            }

            var userView = this._mapper.Map<UserViewModel>(user);

            return new JsonResult(userView);
        }

        [HttpGet("byUserName/{userName}")]
        public IActionResult UserDetails(string userName)
        {
            if (!Logged.IsLogged())
            {
                return Unauthorized();
            }

            var user = this._userService.GetUser(x => x.UserName == userName);

            if (user == null)
            {
                return NotFound();
            }

            var userView = this._mapper.Map<UserViewModel>(user);

            return new JsonResult(userView);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRegisterInputModel loginModel)
        {
            var userToLogin = this._userService.GetUser(x => x.UserName == loginModel.UserName);

            if (userToLogin == null || userToLogin.PasswordHash != Hasher.Hash(loginModel.Password))
            {
                return NotFound();
            }

            var user = userToLogin;
            Logged.User = user;

            return Ok();
        }

        [HttpPost("add")]
        public IActionResult Add(LoginRegisterInputModel userInputModel)
        {
            var users = this._userService.GetUsers(x => x.UserName == userInputModel.UserName);
            if (users.Count > 0)
            {
                return new JsonResult("Има потребител със същото потребителско име.");
            }
            var user = this._mapper.Map<User>(userInputModel);
            this._userService.AddUser(user);

            return Ok();
        }

        [HttpGet("edit/{id}")]
        public IActionResult Edit(int id)
        {
            if (!Logged.IsLogged() || Logged.User.Id != id)
            {
                return Unauthorized();
            }

            var user = Logged.User;
            var userView = this._mapper.Map<UserViewModel>(user);

            return new JsonResult(userView);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Edit(LoginRegisterInputModel userInputModel, int id)
        {
            if (!Logged.IsLogged() || Logged.User.Id != id)
            {
                return Unauthorized();
            }

            var user = this._mapper.Map<User>(userInputModel);
            user.Id = id;
            this._userService.EditUser(user);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            if (!Logged.IsLogged() || Logged.User.Id != id)
            {
                return Unauthorized();
            }

            var user = this._userService.GetUser(id);

            if (user == null)
            {
                return NotFound();
            }

            this._userService.DeleteUser(user);
            Logged.User = null;

            return Ok();
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Logged.User = null;
            return Ok();
        }
    }
}

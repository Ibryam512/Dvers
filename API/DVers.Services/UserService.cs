using DVers.Data.Models;
using DVers.Data.Repositories.Interfaces;
using DVers.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DVers.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            this._userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        public List<User> GetUsers() => this._userRepository.GetUsers();

        public List<User> GetUsers(Expression<Func<User, bool>> predicate) => this._userRepository.GetUsers(predicate);

        public User GetUser(int id) => this._userRepository.GetUser(id);

        public User GetUser(Expression<Func<User, bool>> predicate) => this._userRepository.GetUser(predicate);

        public void AddUser(User user) => this._userRepository.AddUser(user);

        public void EditUser(User user) => this._userRepository.EditUser(user);

        public void DeleteUser(User user) => this._userRepository.DeleteUser(user);
    }
}

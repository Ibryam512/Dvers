using DVers.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DVers.Data.Repositories.Interfaces
{
    public interface IUserRepository
    {
        List<User> GetUsers();
        List<User> GetUsers(Expression<Func<User, bool>> predicate);
        User GetUser(int id);
        User GetUser(Expression<Func<User, bool>> predicate);
        void AddUser(User user);
        void EditUser(User user);
        void DeleteUser(User user);
    }
}

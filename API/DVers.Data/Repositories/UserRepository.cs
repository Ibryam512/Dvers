using DVers.Data;
using DVers.Data.Models;
using DVers.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DVers.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DversDbContext _context;

        public UserRepository(DversDbContext context)
        {
            this._context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public List<User> GetUsers() => this._context.Users.ToList();

        public List<User> GetUsers(Expression<Func<User, bool>> predicate) => this._context.Users.Where(predicate).ToList();

        public User GetUser(int id) => this._context.Users.Find(id);

        public User GetUser(Expression<Func<User, bool>> predicate) => this._context.Users.SingleOrDefault(predicate);

        public void AddUser(User user)
        {
            this._context.Users.Add(user);
            this._context.SaveChanges();
        }

        public void EditUser(User user)
        {
            this._context.Users.Update(user);
            this._context.SaveChanges();
        }

        public void DeleteUser(User user)
        {
            this._context.Users.Remove(user);
            this._context.SaveChanges();
        }
    }
}

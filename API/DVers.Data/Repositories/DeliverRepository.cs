using DVers.Data.Models;
using DVers.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DVers.Data.Repositories
{
    public class DeliverRepository : IDeliverRepository
    {
        private readonly DversDbContext _context;

        public DeliverRepository(DversDbContext context)
        {
            this._context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public List<Deliver> GetDelivers() => this._context.Delivers.Include(x => x.Deliverer).ToList();

        public List<Deliver> GetDelivers(Expression<Func<Deliver, bool>> predicate) => this._context.Delivers.Include(x => x.Deliverer).Where(predicate).ToList();

        public Deliver GetDeliver(int id) => this._context.Delivers.Include(x => x.Deliverer).SingleOrDefault(x => x.Id == id);

        public Deliver GetDeliver(Expression<Func<Deliver, bool>> predicate) => this._context.Delivers.Include(x => x.Deliverer).SingleOrDefault(predicate);

        public void AddDeliver(Deliver deliver)
        {
            this._context.Delivers.Add(deliver);
            this._context.SaveChanges();
        }

        public void EditDeliver(Deliver deliver)
        {
            this._context.Delivers.Update(deliver);
            this._context.SaveChanges();
        }

        public void DeleteDeliver(Deliver deliver)
        {
            this._context.Delivers.Remove(deliver);
            this._context.SaveChanges();
        }
    }
}

using DVers.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DVers.Services.Interfaces
{
    public interface IDeliverService
    {
        List<Deliver> GetDelivers();
        List<Deliver> GetDelivers(Expression<Func<Deliver, bool>> predicate);
        Deliver GetDeliver(int id);
        Deliver GetDeliver(Expression<Func<Deliver, bool>> predicate);
        void AddDeliver(Deliver deliver);
        void EditDeliver(Deliver deliver);
        void DeleteDeliver(Deliver deliver);
    }
}

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
    public class DeliverService : IDeliverService
    {
        private readonly IDeliverRepository _deliverRepository;

        public DeliverService(IDeliverRepository deliverRepository)
        {
            this._deliverRepository = deliverRepository ?? throw new ArgumentNullException(nameof(deliverRepository));
        }

        public List<Deliver> GetDelivers() => this._deliverRepository.GetDelivers();

        public List<Deliver> GetDelivers(Expression<Func<Deliver, bool>> predicate) => this._deliverRepository.GetDelivers(predicate);

        public Deliver GetDeliver(int id) => this._deliverRepository.GetDeliver(id);

        public Deliver GetDeliver(Expression<Func<Deliver, bool>> predicate) => this._deliverRepository.GetDeliver(predicate);

        public void AddDeliver(Deliver deliver) => this._deliverRepository.AddDeliver(deliver);

        public void EditDeliver(Deliver deliver) => this._deliverRepository.EditDeliver(deliver);

        public void DeleteDeliver(Deliver deliver) => this._deliverRepository.DeleteDeliver(deliver);
    }
}

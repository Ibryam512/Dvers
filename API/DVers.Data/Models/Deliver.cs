using System;

namespace DVers.Data.Models
{
    public class Deliver : BaseEntity
    {
        public string Name { get; set; }
        public string MesaureUnit { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int DelivererId { get; set; }
        public virtual User Deliverer { get; set; }
        public DateTime DeliverDate { get; set; }
    }
}

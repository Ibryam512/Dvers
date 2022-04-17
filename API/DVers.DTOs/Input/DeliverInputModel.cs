using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DVers.DTOs.Input
{
    public class DeliverInputModel
    {
        public string Name { get; set; }
        public string MesaureUnit { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public DateTime DeliverDate { get; set; }
    }
}

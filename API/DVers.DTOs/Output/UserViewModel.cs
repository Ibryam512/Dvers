using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DVers.DTOs.Output
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public bool IsApproved { get; set; }
    }
}

using System.Collections.Generic;

namespace DVers.Data.Models
{
    public class User : BaseEntity
    {
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public List<Deliver> Delivers { get; set; }
    }
}

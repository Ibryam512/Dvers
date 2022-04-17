using DVers.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DVers.Services.Helpers
{
    public static class Logged
    {
        public static User User { get; set; }

        public static bool IsLogged()
        {
            if (User != null)
                return true;
            return false;
        }
    }
}

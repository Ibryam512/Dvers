using DVers.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DVers.Data
{
    public class DversDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Deliver> Delivers { get; set; }

        public DversDbContext(DbContextOptions<DversDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Deliver>()
              .HasOne(deliver => deliver.Deliverer)
              .WithMany(user => user.Delivers)
              .HasForeignKey(deliver => deliver.DelivererId);
        }
    }
}

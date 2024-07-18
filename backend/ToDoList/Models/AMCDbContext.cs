using System;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;


namespace ToDoList.Models
{
    public partial class AMCDbContext : DbContext
    {

        public AMCDbContext(DbContextOptions<AMCDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Activity> Activities { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseSqlServer("Server=KOZA\\SQLEXPRESS;Database=todolist;Trusted_Connection=True;TrustServerCertificate=True;");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasCharSet("utf8")
                .UseCollation("utf8_swedish_ci");

            modelBuilder.Entity<Activity>(entity =>
            {
                entity.ToTable("activity");

                entity.Property(e => e.Id);

                entity.Property(e => e.Name);

                entity.Property(e => e.DueDate);

                entity.Property(e=> e.isDeleted);


                entity.HasOne(d => d.User)
                .WithMany(p=> p.Activities)
                .HasForeignKey(d => d.RealId);


            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e=> e.RealId)
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Id);

                entity.Property(e => e.Password);

                entity.Property(e => e.Salt);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
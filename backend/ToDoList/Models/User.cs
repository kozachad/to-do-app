using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace ToDoList.Models
{
    public partial class User
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // RealId otomatik artan

        public int RealId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }

        public string Password { get; set; }
        public string Salt { get; set; }

        //public ICollection<Activity> Activities { get; set; }

        public ICollection<Activity> Activities { get; set; } = new List<Activity>();

    }
}
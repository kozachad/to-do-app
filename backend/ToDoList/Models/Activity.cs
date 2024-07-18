using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace ToDoList.Models
{
    public partial class Activity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DueDate { get; set; }

        public bool isDeleted   { get; set; }


        [ForeignKey("User")]
        public int RealId { get; set; }
        public User User { get; set; } 

    }
}
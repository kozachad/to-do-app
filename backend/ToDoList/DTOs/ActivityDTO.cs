using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ToDoList.Models;

namespace ToDoList.DTOs
{
    public class ActivityDTO
    {
        //public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DueDate { get; set; }

        public int RealId { get; set; }

    }
}
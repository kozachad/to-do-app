﻿using System;

namespace ToDoList.DTOs
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
    }
}
# To-Do App

This project is a To-Do application with a login system protected by JWT, allowing users to perform CRUD operations. The backend is a .NET 8.0 Web API, while the frontend is developed using Angular 18.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login system (protected by JWT)
- CRUD (Create, Read, Update, Delete) operations for users
- Add, update, delete, and view tasks (To-Dos)
- User-based task management

## Technologies Used

### Backend

- .NET 8.0 Web API
- JWT (Json Web Token) for authentication

### Frontend

- Angular 18

## Installation

### Requirements

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js and npm](https://nodejs.org/) (for Angular CLI)

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/to-do-app.git
    cd to-do-app/backend
    ```

2. Install the necessary dependencies:
    ```bash
    dotnet restore
    ```

3. Configure the database connection in the `appsettings.json` file.

4. Start the application:
    ```bash
    dotnet run
    ```

### Frontend Setup

1. Clone the repository (if you haven't already):
    ```bash
    git clone https://github.com/yourusername/to-do-app.git
    cd to-do-app/frontend
    ```

2. Install Angular CLI (if not already installed):
    ```bash
    npm install -g @angular/cli
    ```

3. Install the necessary dependencies:
    ```bash
    npm install
    ```

4. Start the application:
    ```bash
    ng serve
    ```

5. Open [http://localhost:4200](http://localhost:4200) in your browser.

## Usage

1. Log in or create a new account.
2. Add, update, delete, and view your tasks (To-Dos).
3. Manage your tasks based on your user account.

## Contributing

If you would like to contribute, please follow these steps:

1. Fork this repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Add new feature"
    ```
4. Push to the branch:
    ```bash
    git push origin feature/feature-name
    ```
5. Open a Pull Request (PR).

## License

This project is licensed under the MIT License. For more details, see the `LICENSE` file.

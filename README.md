# TaskManagerApp

A simple full-stack Task Manager built with **ASP.NET Core Web API** and a **vanilla JavaScript + HTML/CSS frontend**. 
I made this project to experiment with C# and .NET.

## 📦 Features

- Create, read, update, and delete (CRUD) tasks  
- RESTful API built with C# and Entity Framework Core  
- Responsive frontend built with HTML, CSS, and JavaScript  
- Connected to a relational database (supports Railway or Azure SQL)  
- Easily extendable to include authentication or filtering  

## 💠 Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Backend     | ASP.NET Core Web API (C#)           |
| Database    | SQL Server (via Entity Framework)   |
| Frontend    | HTML, CSS, JavaScript               |
| Deployment  | Railway / Azure (configurable)      |

## 📂 Project Structure

```
TaskManagerApp/
├── Controllers/
│   ├── TasksController.cs
│   └── frontend/
│       ├── index.html
│       ├── app.js
│       └── style.css
├── Models/
├── Data/
├── Migrations/
├── Program.cs
├── appsettings.json
└── ...
```
### Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download) installed  
- SQL Server (or Railway DB / Azure SQL configured)  
- Visual Studio or VS Code  

#### 🔹 Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/TaskManagerApp.git
cd TaskManagerApp
```

#### 🔹 Step 2: Update the connection string
Open ```appsettings.Development.json``` or ```appsettings.json``` and replace the default connection string with your database credentials.

#### 🔹 Step 3: Apply migrations & run the server
```bash
dotnet ef database update
dotnet run
```
#### 🔹 Step 4: Open the frontend
Navigate to:

```bash
Controllers/frontend/index.html
```
Open it in your browser or serve with Live Server in VS Code.

### 📌 Notes
This app was built as a practice project to explore C#, ASP.NET Core, and integrating frontend + backend.

Deployment-ready for hosting on Railway, Azure, or similar platforms.

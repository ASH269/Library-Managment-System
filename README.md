# 📚 KLA Library Management System

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue)

A full-stack **Library Management System** developed using the MERN stack. The application provides separate functionality for students, librarians, and administrators, including book management, borrowing and returning, user authentication, and library activity tracking.

## ✨ Features

### 👨‍🎓 Student Features

* User registration and login
* Browse and search available books
* Request book issuance
* Submit return requests
* View due dates and fines
* View borrowing history
* Personal dashboard

### 📚 Librarian Features

* Add, edit, and remove books
* Upload book images
* Approve or reject book issue requests
* Manage return requests
* View issued books
* Monitor library activity

### 👨‍💼 Admin Features

* Manage user accounts
* Assign librarian privileges
* View system statistics
* Manage administrative operations

## 🛠️ Technology Stack

### Frontend

* React.js
* React Router
* React Bootstrap
* Axios
* React Icons
* React Toastify
* React Hook Form
* Context API
* Custom CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt
* Nodemailer
* Multer
* Cloudinary

### Development & Testing

* Visual Studio Code
* Git & GitHub
* Thunder Client

### Deployment

* Vercel — Frontend
* Render — Backend
* MongoDB Atlas — Database
* Cloudinary — Media Storage

## 🏗️ Project Structure

```text
KLA-Library-Management/
│
├── backend/
│   ├── config/
│   ├── controller/
│   ├── middlewares/
│   ├── model/
│   ├── routes/
│   ├── schemas/
│   ├── utils/
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔐 Authentication

The application uses JWT-based authentication and role-based access control.

Three user roles are supported:

* **Admin**
* **Librarian**
* **Student**

Authentication and authorization are handled through the backend to restrict access to role-specific functionality.

Passwords are protected using Bcrypt hashing.

## 📖 Main Modules

### User Management

Users can register and log in to the system, with account information stored in MongoDB.

### Book Management

Librarians can add, update, and remove books and manage book availability.

### Borrowing & Returns

Students can request books and submit return requests, while librarians can approve and manage these requests.

### Dashboard & Statistics

The home dashboard provides information such as:

* Total book categories
* Total books
* Active students
* Book categories
* New arrivals
* Library hours

## ⚙️ Installation

### 1. Download the Project

Download or clone the project and open the project folder in Visual Studio Code.

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

## 🔑 Environment Variables

Create a `.env` file inside the `backend` directory.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
EMAIL_SERVICE=your_email_service
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

For the frontend, configure the backend URL according to your environment.

**Never upload `.env` files or credentials to GitHub.**

## ▶️ Running the Project

### Start the Backend

From the `backend` directory:

```bash
node index.js
```

The backend runs on:

```text
http://localhost:5000
```

### Start the Frontend

From the `frontend` directory:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

Open the frontend URL in your browser.

## 🗄️ Database

The application uses **MongoDB Atlas** with **Mongoose** for database management.

The database connection is configured through the `MONGO_URI` environment variable.

## 🔒 Security

Sensitive configuration values are stored using environment variables.

Do not commit the following to a public repository:

* Database credentials
* JWT secrets
* Email passwords
* Cloudinary API secrets
* `.env` files

## 🚀 Future Enhancements

* Advanced book search and filtering
* Improved dashboard analytics
* Online book reservations
* Automated email notifications
* Enhanced mobile responsiveness
* Online fine payment
* Book recommendation system

## 📌 Project Information

**Project Name:** KLA Library Management System

**Technology:** MERN Stack

**Application Type:** Full-Stack Web Application


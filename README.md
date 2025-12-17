# To-Do App

<img width="1470" height="956" alt="To-Do-App" src="https://github.com/user-attachments/assets/e00d773e-f3a7-425b-8a47-575f7e4b4d69" />

## Project Overview

The To-Do App is a full-stack application designed to help users manage their tasks efficiently. It features a Node.js backend with Express and MongoDB for task management and user authentication, and a React frontend for a seamless user experience.

---

## Features

### Backend

- User authentication using JWT.
- CRUD operations for tasks.
- Middleware for token validation.
- MongoDB for data storage.
- Token management for refresh tokens or blacklisting (via `Token.js`).

### Frontend

- User-friendly interface built with React.
- Context API for state management.
- Pages for user login, registration, and task dashboard.
- Responsive design.
- Utility functions for API requests and authentication (`authService.js`, `axios.js`).

---

## Project Structure

### Backend

```
backend/
├── config/             # Database configuration
├── controllers/        # API controllers
├── middleware/         # Middleware for authentication
├── models/             # Mongoose models
│   ├── Task.js         # Task schema
│   ├── Token.js        # Token schema for refresh tokens
│   └── Users.js        # User schema
├── routes/             # API routes
├── utils/              # Utility functions
├── app.js              # Application setup
├── server.js           # Entry point for the backend server
└── .env                # Environment variables
```

### Frontend

```
frontend/ToDoApp/
├── public/             # Static assets
├── src/                # Source code
│   ├── components/     # Reusable components
│   ├── context/        # Context API for state management
│   ├── layout/         # Layout components
│   ├── pages/          # Application pages
│   │   ├── Dashboard.jsx # Task dashboard
│   │   ├── Login.jsx     # Login page
│   │   ├── Register.jsx  # Registration page
│   │   └── footer.jsx    # Footer component
│   ├── utils/          # Utility functions
│   │   ├── authService.js # Handles authentication logic
│   │   └── axios.js      # Axios instance for API requests
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point for the frontend
├── package.json        # Frontend dependencies
└── vite.config.js      # Vite configuration
```

---

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the backend folder and install dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables in a `.env` file in the `backend` folder:

   ```env
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

5. Navigate to the frontend folder and install dependencies:

   ```bash
   cd ../frontend/ToDoApp
   npm install
   ```

6. Start the frontend development server:

   ```bash
   npm run dev
   ```

7. Open the application in your browser at `http://localhost:3000`.

---

## Usage

1. Register a new user account.
2. Log in to access the task dashboard.
3. Create, update, and delete tasks as needed.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)

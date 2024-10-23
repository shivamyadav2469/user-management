# User Management App

This is a simple User Management application built with React, Redux Toolkit, Node.js, Express.js, and MongoDB. It allows users to register, log in, and manage a list of users with functionalities for fetching, editing, and deleting user information.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- User registration and login
- Fetch a list of users
- Edit user details
- Delete a user
- Responsive design

## Technologies
- **Frontend**: React, Redux Toolkit, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (v14 or higher)
- MongoDB (local installation or a cloud instance)

### Install Backend
- npm init -y
- npm install express mongoose bcryptjs jsonwebtoken cors axios
- npm install --save-dev nodemon

### Install Frontend 
- npm install axios @reduxjs/toolkit react-redux

### backend working 
- http://localhost:5000

### we use JWt Token 
### In .env file 
- MONGO_URI
- JWT_SECRET
- PORT
### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/shivamyadav2469/user-management.git
   cd user-management-app/frontend

# 📝 Todo List API

> A secure, feature-rich RESTful API for managing your to-do list with user authentication and authorization.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🎥 Demo](#-demo)
- [🚀 Getting Started](#-getting-started)
- [🔐 Environment Variables](#-environment-variables)
- [📡 API Endpoints](#-api-endpoints)
- [📄 Pagination & Sorting](#-pagination--sorting)
- [🔒 Security](#-security)
- [🧪 Testing](#-testing)
- [📬 Postman Collection](#-postman-collection)
  
## ✨ Features

✅ **User Authentication** - Secure registration and login with JWT tokens  
✅ **CRUD Operations** - Complete todo management (Create, Read, Update, Delete)  
✅ **Authorization** - Users can only access and modify their own todos  
✅ **Pagination** - Efficient data retrieval with customizable page size  
✅ **Rate Limiting** - Protection against DDoS attacks and API abuse  
✅ **Input Validation** - Robust validation using Joi schemas  
✅ **Error Handling** - Structured and meaningful error responses  
✅ **Unit Testing** - Comprehensive test coverage with Jest & Supertest  
✅ **Password Security** - Passwords are hashed before storage  
✅ **Token-Based Auth** - Stateless authentication using JWT  

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **JWT** | Authentication tokens |
| **Joi** | Schema validation |
| **express-rate-limit** | Rate limiting middleware |
| **Jest** | Testing framework |
| **Supertest** | HTTP assertions |
| **bcrypt** | Password hashing |

## 🎥 Demo

📹 **Watch the API in action!**

[🎬 View Demo Video](https://drive.google.com/file/d/1SESM2lMo5yxvxzhsYZStyQ7EVApoB5AI/view?usp=sharing)

*Click the link above to see a complete walkthrough of the API features and endpoints.*

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1️⃣ **Clone the repository**
```bash
git clone <repo-url>
cd <repo-folder>
```

2️⃣ **Install dependencies**
```bash
npm install
```

3️⃣ **Configure environment variables**

Create a `.env` file in the root directory:
```env
MONGOURL=<your-mongo-connection-string>
PORT=8080
JWT_SECRET=<your-jwt-secret>
```

4️⃣ **Start the server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

🎉 Server is now running at `http://localhost:8080`

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGOURL` | MongoDB connection string | `mongodb://localhost:27017/todoapi` |
| `PORT` | Server port number | `8080` |
| `JWT_SECRET` | Secret key for JWT signing | `your_super_secret_key_here` |

## 📡 API Endpoints

### 👤 User Routes

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/users/register` | `POST` | Register a new user | ❌ |
| `/users/login` | `POST` | Login and receive JWT token | ❌ |

#### 📝 Register User
```http
POST /users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@doe.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 🔑 Login User
```http
POST /users/login
Content-Type: application/json

{
  "email": "john@doe.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### ✅ Todo Routes

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/todos` | `POST` | Create a new todo | ✅ |
| `/todos` | `GET` | Get all todos (paginated) | ✅ |
| `/todos/:id` | `GET` | Get a single todo by ID | ✅ |
| `/todos/:id` | `PUT` | Update a todo | ✅ |
| `/todos/:id` | `DELETE` | Delete a todo | ✅ |

#### ➕ Create Todo
```http
POST /todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Buy milk, eggs, and bread"
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Buy groceries",
  "description": "Buy milk, eggs, and bread"
}
```

#### 📋 Get All Todos
```http
GET /todos?page=1&limit=10
Authorization: Bearer <token>
```

**Response:**
```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Buy groceries",
      "description": "Buy milk, eggs, and bread"
    },
    {
      "id": "507f1f77bcf86cd799439012",
      "title": "Pay bills",
      "description": "Pay electricity and water bills"
    }
  ],
  "page": 1,
  "limit": 10,
  "total": 2
}
```

#### 🔍 Get Single Todo
```http
GET /todos/:id
Authorization: Bearer <token>
```

#### ✏️ Update Todo
```http
PUT /todos/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Buy milk, eggs, bread, and cheese"
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Buy groceries",
  "description": "Buy milk, eggs, bread, and cheese"
}
```

#### 🗑️ Delete Todo
```http
DELETE /todos/:id
Authorization: Bearer <token>
```

**Response:** `204 No Content`

### 🔴 Error Responses

#### 401 Unauthorized
```json
{
  "message": "Unauthorized"
}
```

#### 403 Forbidden
```json
{
  "message": "Forbidden"
}
```

#### 404 Not Found
```json
{
  "message": "Todo not found"
}
```

## 📄 Pagination & Sorting

The API supports pagination for retrieving todos efficiently:

- **Default:** `page=1`, `limit=10`
- **Usage:** `/todos?page=2&limit=5`
- **Sorting:** Todos are sorted by creation date (newest first)

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |

## 🔒 Security

This API implements multiple security measures:

🛡️ **JWT Authentication** - Stateless, secure token-based authentication  
🚦 **Rate Limiting** - Prevents DDoS attacks and API abuse  
✔️ **Input Validation** - Joi schemas validate all incoming data  
🔐 **Password Hashing** - Bcrypt ensures passwords are never stored in plain text  
👮 **Authorization Checks** - Users can only access their own resources  
🚫 **Error Masking** - Sensitive information is never exposed in errors  

## 🧪 Testing

Comprehensive test suite using **Jest** and **Supertest**.

### Run Tests
```bash
npm test
```

### Test Coverage
✅ User registration and login  
✅ Todo CRUD operations  
✅ Authentication middleware  
✅ Authorization checks  
✅ Pagination functionality  
✅ Error handling  
✅ Input validation  

### Sample Test Output
```bash
PASS  tests/auth.test.js
PASS  tests/todos.test.js

Test Suites: 2 passed, 2 total
Tests:       15 passed, 15 total
```

## 📬 Postman Collection


**Included in Collection:**
- All user endpoints (register, login)
- All todo endpoints (CRUD operations)
- Example requests and responses
- Authentication token management

### How to Use:
1. Import the collection into Postman
3. Start with registration/login to get a token
4. Use the token for protected endpoints

## 🌟 New Features Implemented

✨ **Rate Limiting** - Protects the API from abuse  
✨ **Unit Testing** - Complete test coverage with Jest & Supertest  

## 📂 Project Structure

```
|── controllers/      # Route controllers
│── models/           # Mongoose models
│── routes/           # Express routes
│── middleware/       # Custom middleware
│── validations/       # Joi validation schemas
├── tests/                # Test files
├── .env               # Environment variables template
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!


<div align="center">
  
### 💖 Made with ❤️ by Habiba Abdelgowad


</div>

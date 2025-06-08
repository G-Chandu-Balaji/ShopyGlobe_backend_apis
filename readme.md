# 🛒 ShoppyGlobe E-commerce Backend

This repository contains the backend API for the **ShoppyGlobe** e-commerce platform, developed using **Node.js**, **Express.js**, and **MongoDB**. It features user authentication, product management, and a secure shopping cart system.

---

## 🚀 Features

- 🔐 JWT-based User Authentication
- 📦 Product Listing and Retrieval
- 🛒 Secure Cart Operations
- 🧾 MongoDB Integration via Mongoose
- ✅ Input Validation & Error Handling
- 🧪 Tested using ThunderClient

---

## ▶️ How to Run the Project

Follow the steps below to set up and run the backend server locally.

### 🔧 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm (comes with Node.js)

---

### 🛠️ Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/G-Chandu-Balaji/ShopyGlobe_backend_apis.git
cd ShopyGlobe_backend_apis
```

2. **📦 Install Dependencies**

```bash
npm install
```

3. **📁 Create a .env File**
   Add the Following Environment Variables to .env

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/shoppyglobe
JWT_SECRET=your_jwt_secret
```

ℹ️ Replace MONGO_URI and JWT_SECRET with your actual MongoDB connection string and secret key.

4. **▶️ Start the Server**

if using nodemon then in package.json in script add the following

```
"scripts": {
  "Start": "nodemon Server.js"
}
```

then

```bash
npm start
```

## The server will start on:

📍 http://localhost:5000

## 🛠️ API Endpoints

### 🔐 Authentication

| Method | Endpoint    | Description         |
| ------ | ----------- | ------------------- |
| POST   | `/register` | Register a new user |
| POST   | `/login`    | Login and get JWT   |

---

### 📦 Product APIs

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| GET    | `/products`     | Fetch all products   |
| GET    | `/products/:id` | Fetch product by ID  |
| POST   | `/products`     | Add a New Product    |
| PUT    | `/products/:id` | Update Product by ID |
| DELETE | `/products/:id` | Delete Product by ID |

---

### 🛒 Cart APIs (Protected with JWT)

| Method | Endpoint    | Description                     |
| ------ | ----------- | ------------------------------- |
| GET    | `/cart`     | Fetch products in cart          |
| POST   | `/cart`     | Add product to cart             |
| PUT    | `/cart/:id` | Update product quantity in cart |
| DELETE | `/cart/:id` | Remove product from cart        |

---

## 🧪 API Testing

All APIs were thoroughly tested using **Thunder Client**.

- Test cases include user registration, login, product fetch, and cart operations.
- Screenshots of tests are available in the `/screenshots` directory.

---

## 🗃️ MongoDB Schema

### 🧾 Product Model

```json
{
  "name": "Sample Product",
  "price": 999,
  "description": "High quality product",
  "stockQuantity": 100
}
```

### 🛒 Cart Model

```json
{
  "_Id": "USER_ID_HERE",
  "product": "PRODUCT_ID_HERE",
  "quantity": 2
}
```

### 👤 User Model

```json
{
  "email": "user@example.com",
  "password": "hashed_password"
}
```

### 🔐 JWT Authentication

On successful login, the user receives a **JWT token**.

This token must be included in the `Authorization` header as:

```http
Authorization: Bearer <your_token>
```

All cart routes are protected and require a valid token to access.

### ⚠️ Error Handling & Validation

The application includes centralized error handling and robust input validation:

- ❌ Invalid or missing fields on `POST`/`PUT`
- ❌ Non-existent product ID
- ❌ Unauthorized access to protected routes

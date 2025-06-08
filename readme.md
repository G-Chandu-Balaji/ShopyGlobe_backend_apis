# 🛒 ShoppyGlobe E-commerce Backend

This repository contains the backend API for the **ShoppyGlobe** e-commerce platform, developed using **Node.js**, **Express.js**, and **MongoDB**. It features user authentication, product management, and a secure shopping cart system.

---

## 🚀 Features

- 🔐 JWT-based User Authentication
- 📦 Product Listing and Retrieval
- 🛒 Secure Cart Operations
- 🧾 MongoDB Integration via Mongoose
- ✅ Input Validation & Error Handling
- 🧪 Tested using Postman

---

## 🛠️ API Endpoints

### 🔐 Authentication

| Method | Endpoint    | Description         |
| ------ | ----------- | ------------------- |
| POST   | `/register` | Register a new user |
| POST   | `/login`    | Login and get JWT   |

---

### 📦 Product APIs

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| GET    | `/products`     | Fetch all products  |
| GET    | `/products/:id` | Fetch product by ID |

---

### 🛒 Cart APIs (Protected with JWT)

| Method | Endpoint    | Description                     |
| ------ | ----------- | ------------------------------- |
| POST   | `/cart`     | Add product to cart             |
| PUT    | `/cart/:id` | Update product quantity in cart |
| DELETE | `/cart/:id` | Remove product from cart        |

---

## 🧪 API Testing

All APIs were thoroughly tested using **Postman**.

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
  "userId": "USER_ID_HERE",
  "productId": "PRODUCT_ID_HERE",
  "quantity": 2
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

# Description

**👕 AuraWear** is a modern e-commerce platform built with Next.js and Express.js, offering stylish, casual clothing for men and women of all ages. Our mission is to streamline the online shopping experience through an intuitive interface, responsive design, and powerful features like price, size, and color filtering, paired with seamless Google authentication. Designed for ease of use and accessibility, **AuraWear** delivers a visually appealing shopping experience across all devices, making fashion effortless and inclusive for everyone.

## 📸 Preview

![AuraWear Preview](./public/preview.png)

---

# 🚀 Features

## 🛍️ User Features

- 🔑 Register & login using JWT + Cookies or Google Sign-In
- 🔎 Browse products with advanced filters (price, color, category)
- 🛒 Shopping cart and wishlist
- 💳 Secure checkout with Paymob payment integration
- 📦 Track orders with history & details
- 🌙 Dark / Light mode toggle
- ✨ Pretty and simple UI with animation and skeletons

## 🔐 Admin Features

- 🔑 Admin login with protected dashboard

- ➕ Add / ✏️ Edit / ❌ Delete products

- 📦 Manage orders & update statuses

- 👥 View users & platform statistics (sales, top products)

---

## 🧱 Tech Stack

| Tech              | Role                                               |
| ----------------- | -------------------------------------------------- |
| **Next.js**       | Frontend framework (App Router, Server Components) |
| **TailwindCSS**   | Styling & responsive design                        |
| **Express.js**    | Backend REST API framework                         |
| **MongoDB**       | NoSQL database                                     |
| **Mongoose**      | ODM for MongoDB models & validation                |
| **Cloudinary**    | Image hosting & management                         |
| **JWT + Cookies** | Authentication & authorization                     |
| **Paymob API**    | Payment gateway integration                        |
| **Context API**   | State management on frontend                       |

---

# 🧠 Architecture

🧠 Architecture

- Frontend: Next.js (App Router, Server Components, TailwindCSS)

- Backend: Express.js REST API (MVC structure)

- Database: MongoDB with Mongoose models & schema validation using JOI

- Auth: JWT-based authentication stored in HttpOnly cookies

- Payments: Paymob API for secure checkout

---

# How to use?

1. Clone repo

```sh
git clone https://github.com/yourusername/aurawear.git
cd aurawear
```

2. Install dependencies

- Backend

```sh
  cd backend
  npm install
```

- Frontend

```sh
  cd frontend
  npm install
```

3. Setup environment variables
   Create .env files in both backend & frontend with:

- DB_CONNECTION – MongoDB connection string

- DB_NAME – Database name

- SECRET_KEY – Secret key for JWT

- CLOUDINARY_URL – Cloudinary credentials

- PAYMOB_API_KEY – Paymob integration key

- NEXT_PUBLIC_API_URL – Backend API base URL

4. Run development servers

- Backend

```sh
cd backend
npm start
```

- Frontend

```sh
cd frontend
pnpm run dev
```

---

# What I've learned

- Building a secure full-stack app with JWT + cookies

- Implementing real payment flow using Paymob API

- Advanced Next.js App Router usage with Server Components

- Structuring backend with MVC architecture for scalability

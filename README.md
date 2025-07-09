# 🛒 Product Recommendation System

A full-stack web application where users can post product-related queries and get better product recommendations from others. Users can manage their own queries and recommendations, while also exploring recommendations made for them.

## 🌐 Live Site
🔗 [Live Website URL](https://luxury-moxie-88919a.netlify.app)

---

## 🎯 Purpose

This platform helps users:
- Ask for alternatives to problematic products (e.g., boycotting reasons)
- Get community-driven product recommendations
- Track and manage their personal queries and recommendations

---

## ⚙️ Tech Stack

### Frontend:
- **React**
- **React Router DOM**
- **Firebase Authentication**
- **Tailwind CSS** / DaisyUI
- **Framer Motion** (for animations)
- **SweetAlert2** (for alerts)
- **React Toastify**
- **JWT (JSON Web Token)**

### Backend:
- **Express.js**
- **MongoDB Atlas**
- **CORS**
- **dotenv**
- **jsonwebtoken**

---

## 🚀 Key Features

### 🔐 Authentication
- Email/password and Google-based login (Firebase)
- JWT token stored securely on client side
- Private route protection using JWT

### 📌 Query Management
- Add/update/delete product queries
- View all user’s own queries in descending order
- Query includes product info, boycott reason, timestamp, and user identity

### 💡 Recommendations
- Anyone can recommend a better product for a posted query
- Recommendations include title, image, reason, and recommender identity
- Increment & decrement `recommendationCount` on add/delete

### 👤 Personal Dashboards
- **My Queries**: View/manage your own queries
- **My Recommendations**: View/delete your recommendations
- **Recommendations For Me**: View all recommendations made for your queries

### 🔍 Extra Features
- Search queries by product name
- Grid layout toggle (1/2/3 columns) in All Queries page
- Responsive design for all devices
- Elegant UI using Tailwind and DaisyUI
- Custom 404 Page




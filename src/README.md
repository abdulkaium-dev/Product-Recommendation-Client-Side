# Product Recommendation System

## Purpose
This project is a Product Recommendation platform where users can post queries about products, view other users' queries, and add recommendations for alternative products. It helps users find better alternatives and share their experiences in a community-driven way.

The system includes features like user registration and login (with Firebase Authentication), adding/updating/deleting queries and recommendations, viewing recommendations, and searching queries by product name.

## Live URL
[https://zesty-strudel-2c6569.netlify.app/](https://your-live-site-url.com)  
*(Replace with your actual deployed URL)*

## Key Features
- User Authentication with Email/Password and Google Sign-In (Firebase)
- Secure JWT-based authorization for private routes
- Add, Update, Delete product queries (private to users)
- View all queries with search functionality by product name
- Add recommendations to queries with incrementing recommendation counts
- View all recommendations for a query, shown like comments
- Users can delete their own recommendations
- Responsive design for desktop, tablet, and mobile
- Multiple grid layouts toggle on Queries page (1/2/3 columns)
- Clean and intuitive UI with Navbar, Footer, and 404 error page
- Environment variables used to secure Firebase keys and MongoDB credentials
- Backend built with Node.js, Express, and MongoDB Atlas

## NPM Packages Used

### Client-side
- `react` — Frontend library for building UI components
- `react-router-dom` — Routing and navigation in React
- `firebase` — Firebase Authentication and services
- `axios` — HTTP client for API requests
- `react-toastify` — Toast notifications for success/error messages
- `react-hook-form` — Form handling and validation
- `dotenv` — Load environment variables (for local development)

### Server-side
- `express` — Backend framework for REST APIs
- `cors` — Enable Cross-Origin Resource Sharing
- `jsonwebtoken` — JWT creation and verification for authentication
- `mongodb` — MongoDB driver for Node.js
- `dotenv` — Load environment variables securely
- `bcrypt` (optional) — Password hashing (if used)

---

## How to run locally

1. Clone the repositories:
   - Client: `https://github.com/abdulkaium-dev/Product-Recommendation-Client-Side`
   - Server: `https://github.com/abdulkaium-dev/Product-Recommendation-Server-Side`

2. Create `.env` files in both client and server directories with the following variables:


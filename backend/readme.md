# 🛠️ Aradhana Blog App - Backend

This is the backend server for the Aradhana Blog Application built during the **Build for Bharat Internship Challenge**. It is developed using **Node.js**, **Express**, and **MongoDB**, with JWT-based authentication and full API coverage for blogs, comments, and likes.

---

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Image Upload:** Cloudinary
- **AI Integration:** Groq API
- **Security:** bcrypt, cookie-parser, express-rate-limit, CORS

---

## 📦 Installation

```bash
cd backend
npm install


**🔐 Environment Variables**
Create a .env file in the /backend directory with the following values:

env
```bash

PORT=5000
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_mongodb_connection_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GROQ_API_KEY=your_groq_api_key

```

**▶️ Running the Server**
```bash
npm start
Server runs on: http://localhost:5000
```

## 📚 API Documentation

### 🔐 Auth Routes

POST /api/auth/register  
- Body: { name, email, password }  
- Returns: JWT token, user data

POST /api/auth/login  
- Body: { email, password }  
- Returns: JWT token, user data

GET /api/auth/check-auth  
- Headers: Authorization: Bearer <token>  
- Returns: User info if token is valid


### 📝 Blog Routes

POST /api/blogs/create  
- Headers: Authorization: Bearer <token>  
- Body: { title, content, image (base64) }  
- Returns: Created blog post

GET /api/blogs/getblogs  
- Returns: List of all blogs

GET /api/blogs/:id  
- Returns: Single blog post details

DELETE /api/blogs/delete/:id  
- Headers: Authorization: Bearer <token>  
- Deletes: User's own blog post

PATCH /api/blogs/update/:id  
- Headers: Authorization: Bearer <token>  
- Updates: Blog content/title/image


### 💬 Comment Routes

POST /api/comments/:id  
- Headers: Authorization: Bearer <token>  
- Adds comment to blog post

DELETE /api/comments/:commentId  
- Headers: Authorization: Bearer <token>  
- Deletes user's own comment


### ❤️ Like Route

POST /api/blog/like/:id  
- Headers: Authorization: Bearer <token>  
- Likes or unlikes a blog post


### 🤖 AI Suggestion Route

POST /api/ai/suggest  
- Headers: Authorization: Bearer <token>  
- Body: { prompt }  
- Returns: { titleSuggestion, bulletPoints[] }

---

**⚠️ Notes**
- JWT stored in secure cookies (credentials: true)

- Express rate limiting enabled for protection

- All routes include proper error handling and validation

- Uses Cloudinary for direct image uploads
---

### ⚠️ Notes

Cookies are used for auth — configured with credentials: true in CORS

Rate limiting applied to prevent abuse

All inputs are validated and errors handled gracefully

### ✅ Status

 Authentication (JWT + hashed passwords)

 CRUD Blog API

 Comments & Likes

 AI blog content suggestion (OpenAI or Groq)

 Image upload to Cloudinary

### 📁 Folder Structure

```bash
backend/
├── controllers/
├── routes/
├── middleware/
├── models/
├── utils/
├── index.js
└── .env
```
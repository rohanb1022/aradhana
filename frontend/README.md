# 🖼️ Aradhana Blog App - Frontend

This is the frontend for the Aradhana Blog Application, built using **React**, **TypeScript**, **Tailwind CSS**, and **Shadcn/ui**. The UI is designed to be clean, responsive, and user-friendly, supporting blog creation, commenting, likes, and AI-based suggestions.

---

## 🚀 Tech Stack

- **React + Vite**
- **TypeScript**
- **Tailwind CSS**
- **Shadcn/ui**
- **Zustand** (state management)
- **Axios** (API handling)
- **react-hot-toast** (notifications)

---

## 📦 Installation

```bash
cd frontend
npm install
```

## ▶️Running the App
```bash
npm run dev
```

## 📚 Features Overview

🔐 Authentication
- User Registration & Login
- JWT stored in HTTP-only cookies
- Auto-authentication on page reloads

📝 Blog Management
- Create a blog (with optional image)
- View all blogs
- View single blog in detail
- Edit & delete own blog

💬 Comments
- Add comments on any blog

❤️ Likes
- Like/unlike blogs
- Like count updates in real-time

🤖 AI Suggestions (Groq API)
- Enter a short prompt (max 150 characters)
- Generate blog title and bullet points using AI
- Copy the recommendation

📦 Zustand State Management
- Auth state (handled in `authStore`)
- Blog state (handled in `blogStore`)
  - Includes create, delete, comment, and like actions


🌐 API Integration
- Axios with `withCredentials: true`
- Centralized API config via `lib/axios.ts`

---

## 🔗 API Base URL

```
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true
});

export default API;
```




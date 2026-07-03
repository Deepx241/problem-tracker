# 🚀 Problem Tracker

A full-stack Problem Tracker application built to help programmers organize, track, and analyze their coding practice across platforms like LeetCode, Codeforces, GeeksforGeeks, HackerRank, and more.

## ✨ Features

- 🔐 Secure JWT Authentication
- 👤 User Registration & Login
- ➕ Add coding problems
- ✏️ Edit existing problems
- 🗑️ Delete problems
- 🔍 Search problems by title
- 🎯 Filter by:
  - Platform
  - Difficulty
  - Status
  - Topic
- 📊 Analytics Dashboard
  - Problems solved
  - Difficulty distribution
  - Status overview
- 📄 Pagination
- 🌙 Clean responsive UI
- ☁️ MongoDB Atlas integration
- 🔒 Protected API routes

---

## 🛠 Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- CORS

---

## 📂 Project Structure

```
problem-tracker/
│
├── app/
├── components/
├── lib/
├── public/
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│   ├── package.json
│
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Deepx241/problem-tracker.git
```

```
cd problem-tracker
```

---

## Install Frontend

```bash
npm install
```

---

## Install Backend

```bash
cd server
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Run Backend

```bash
cd server
npm run dev
```

Runs on:

```
http://localhost:5000
```

---

## Run Frontend

```bash
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

## 📸 Features Preview

- User Authentication
- Dashboard
- Add Problem
- Edit Problem
- Delete Problem
- Search
- Filters
- Pagination
- Analytics

---

## Future Improvements

- Dark/Light Theme
- Profile Page
- Notes Editor
- Company-wise Tracking
- Contest History
- Import from LeetCode
- Export Progress
- Streak Tracking
- Mobile App

---

## Author

**Deep Kevadiya**

GitHub:
https://github.com/Deepx241

LinkedIn:
https://www.linkedin.com/in/deep-kevadiya-690303322/

---

## License

This project is licensed under the MIT License.

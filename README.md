# 🏫 College Communication Portal

A full-stack web platform designed to simplify communication between **students and faculty**.  
Faculty can post announcements, students can raise academic queries, and both can engage in transparent discussions via **Reddit-style threaded replies and voting**.

---

## 🚀 Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | ⚡ React, Tailwind CSS, Shadcn/UI, Vite |
| **Backend** | 🛠️ Node.js, Express.js |
| **Database** | 🍃 MongoDB (Mongoose ODM) |
| **Authentication** | 🔐 JWT + Nodemailer (Ethereal Email) |
| **Tools** | 🧰 Postman, dotenv, Cloudinary *(optional for image uploads)* |

---

## ✨ Features

- 👨‍🏫 **Faculty Announcements** — Faculty can post official updates accessible by all students.  
- ❓ **Student Queries** — Students can create posts for academic questions.  
- 💬 **Threaded Replies & Faculty Answers** — Replies are nested for structured discussions.  
- ⬆️⬇️ **Reddit-Style Voting** — Upvote or downvote posts and replies dynamically.  
- 🏷️ **Tag-based Filtering** — Filter posts by topics like *Exams*, *Assignments*, or *Attendance*.  
- 🔐 **Role-based Authentication** — Secure login for faculty and students with JWT tokens.  
- 📧 **Email Verification via Ethereal** — Automatic verification link through temporary email.  
- 🧭 **Personalized Dashboard** — Displays trending queries and new announcements.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Dantheman2606/Student-query-system.git
cd Student-query-system
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```


Create a `.env` file inside `/backend`:
```bash
MONGO_URI = <your-Mongo-URI> 
JWT_SECRET = <your-JWT-secret>
PORT = 5001
EMAIL_USER=<ethreal-email-id>
EMAIL_PASS=	<ethreal-email-password>
FRONTEND_URL=http://localhost:5173
```
Run the server:
```bash
nodemon ./index.js
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
#### Visit the app at 👉 **[http://localhost:5173](http://localhost:5173/)**  

---

## 🧠 Future Improvements

- 🔔 Real-time updates via **WebSockets (Socket.io)**  
- 📱 Enhanced **mobile responsiveness**  
- 📧 **Email notifications** for replies and announcements  
- 📊 **Admin dashboard** for analytics and moderation  
- 🗂️ **Pagination** and global **search** for queries  

---



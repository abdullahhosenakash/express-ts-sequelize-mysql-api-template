# 🚀 Express TS + Sequelize + MySQL API Boilerplate

A production-ready backend boilerplate built with **Express (v5)**, **TypeScript**, **Sequelize**, and **MySQL**.
Includes authentication, session management, file upload with compression, and structured API architecture.

---

## ✨ Features

- 🔐 **Authentication System**
  - Register / Login
  - Secure password hashing using `bcryptjs`
  - Token/session-based authentication

- 🧠 **Session Management**
  - Login session tracking
  - Device + IP-based session storage
  - Session history support
  - Secure token (hashed in DB)

- 📧 **Email Service**
  - SMTP-based email sending using `nodemailer`
  - Ideal for verification, password reset, etc.

- 📁 **File Upload System**
  - Upload using `multer`
  - Automatic image compression with `sharp`
  - Converts images to **WebP (~200KB)**
  - Organized folder structure (`/uploads/year/month`)
  - Hidden file path (`/assets/year/month`)
  - Delete old files support

- 👤 **User Module**
  - User CRUD
  - Profile management
  - Role-based structure (extendable)

- 🛡️ **Validation**
  - Request validation using `zod`

- 🌐 **Utilities**
  - IP detection (`request-ip`)
  - Environment config (`dotenv`)
  - Clean modular architecture

---

## 📦 Tech Stack

- Node.js
- Express v5
- TypeScript
- Sequelize ORM
- MySQL
- Multer + Sharp
- Nodemailer
- Zod

---

## 📁 Project Structure

```
src/
│
├── app/              # API routes, error handling, etc.
├── config/           # DB, env configs, multer setup
├── controllers/      # Route controllers
├── email/            # Email templates and sending logic
├── middlewares/      # Auth, validation, upload, etc.
├── models/           # Sequelize models
├── routes/           # API routes
├── utils/            # Helpers
├── validations/      # Request validations
|
|── server.ts         # Entry point
│
└── uploads/          # Uploaded files (year/month)
```

---

## ⚙️ Installation

```bash
git clone https://github.com/abdullahhosenakash/express-ts-sequelize-mysql-api-template.git

cd express-ts-sequelize-mysql-api-template

npm install
```

---

## 🔑 Environment Variables

An env file is provided. You can just update the file variables.

---

## ▶️ Run Project

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

## 📡 API Modules Overview

### 🔐 Auth Routes

```
POST   /auth/signup
POST   /auth/login
POST   /auth/change-password
GET    /auth/refresh
```

---

### 👤 User Routes

```
GET    /user/all
```

---

### 📧 Mail Routes

```
POST   /mail/testing
```

---

### 📁 Upload Routes

```
POST   /upload/single
```

- Accepts any files
- Image files converted to WebP
- Compresses to ~200KB
- Returns file path

---

### 🧾 Session Routes

```
GET    /auth/login-sessions
DELETE /auth/login-sessions/:id
```

- View login history
- Manage active sessions with ip and location details

---

## 🧠 Key Concepts

### 🔑 Secure Token Strategy

- Raw token → sent to client
- Hashed token → stored in DB
- Prevents token leakage

---

### 🖼️ Image Optimization

- Uses `sharp`
- Converts all images → `.webp`
- Resizes & compresses (~200KB target)
- Saves storage + improves performance

---

### 🧹 File Cleanup

- Supports deleting old files during update
- Prevents unused file accumulation

---

## 🧪 Example Request (Upload)

```json
{
  "file": "image.png",
  "old_files": ["/assets/2026/04/example.webp"]
}
```

---

## 📌 Notes

- Designed for **scalable SaaS/API projects**
- Easy to extend (multi-tenant, RBAC, etc.)
- Optimized for **low-cost hosting (like cPanel/Vercel APIs)**

---

## 🛠️ Future Improvements

- JWT optional auth
- Refresh token system
- Role & permission system (RBAC)
- API rate limiting

---

## 🤝 Contribution

Feel free to fork and improve. PRs are welcome.

---

## 📄 License

ISC License

---

## 💡 Author

Abdullah Hosen Akash (@abdullahhosenakash)

---

## 🚀 About

Built for rapid backend development with a clean architecture, scalable structure, and production-ready setup for modern API applications.

---

**Happy Coding 🚀**

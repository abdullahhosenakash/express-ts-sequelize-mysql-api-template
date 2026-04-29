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
├── config/           # DB, env configs
├── controllers/      # Route controllers
├── middlewares/      # Auth, validation, upload, etc.
├── models/           # Sequelize models
├── routes/           # API routes
├── services/         # Business logic (optional)
├── utils/            # Helpers (file delete, mail, etc.)
│
├── uploads/          # Uploaded files (year/month)
│
└── server.ts         # Entry point
```

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/your-repo.git

cd your-repo

npm install
```

---

## 🔑 Environment Variables

Create a `.env` file:

```
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=database_name

SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_USER=your@email.com
SMTP_PASS=yourpassword

BASE_URL=http://localhost:5000
```

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
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
```

---

### 👤 User Routes

```
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

---

### 📧 Mail Routes

```
POST   /api/mail/send
```

---

### 📁 Upload Routes

```
POST   /api/upload
```

- Accepts image files
- Converts to WebP
- Compresses to ~200KB
- Returns file path

---

### 🧾 Session Routes

```
GET    /api/sessions
DELETE /api/sessions/:id
```

- View login history
- Manage active sessions

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
  "old_files": ["/uploads/2026/04/example.webp"]
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
- Swagger documentation

---

## 🤝 Contribution

Feel free to fork and improve. PRs are welcome.

---

## 📄 License

ISC License

---

## 💡 Author

Built for rapid backend development with clean structure and production-ready features.

---

**Happy Coding 🚀**

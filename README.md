

---


# 📝 MERN Todo List Application with JWT Authentication

A full-stack Todo List app built using the MERN stack (MongoDB, Express, React, Node.js) with secure login, signup, and logout functionality using JSON Web Tokens (JWT). Styled beautifully with Tailwind CSS.

---

## 🚀 Features

- ✅ User Signup and Login with JWT Authentication
- ✅ Protected routes using JWT
- ✅ Create, Read, Delete Todos
- ✅ React Context API for Auth State
- ✅ Tailwind CSS for sleek UI
- ✅ MongoDB for persistent storage

---

## 📁 Project Structure

```

mern-todo-app/
├── backend/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── index.css
├── README.md

````

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

```bash
cd backend
npm install
````

Create a `.env` file:

```
JWT_SECRET=your_jwt_secret_key
```

Run the backend:

```bash
npm start
```



---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Make sure `tailwind.config.js` and `index.css` are correctly set up for Tailwind CSS.

---

## 🔐 Authentication Flow

* Users sign up and receive a JWT token.
* JWT is stored in `localStorage` and attached to Axios requests.
* Protected API routes use middleware to verify the JWT.

---

## 📦 API Endpoints

### Auth Routes

* `POST /api/auth/signup` – Register a new user
* `POST /api/auth/login` – Login and receive JWT

### Todo Routes (Protected)

* `GET /api/todos` – Get all todos for the logged-in user
* `POST /api/todos` – Add a new todo
* `DELETE /api/todos/:id` – Delete a todo

---

## 🛡️ Security Features

* Passwords hashed using `bcrypt`
* JWT-based stateless authentication
* Token stored securely in memory and localStorage

---

---

## 🧪 Tech Stack

* **Frontend:** React, Tailwind CSS, Axios, React Router
* **Backend:** Node.js, Express.js, JWT, bcrypt
* **Database:** MongoDB (Mongoose)

---

## 🧑‍💻 Author

Developed by \[Your Name].

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

```

---


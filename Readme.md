# 🔐 MERN Full Authentication App

A complete **Authentication System** built with the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. Includes secure user login, signup, logout, forgot password, and reset password functionalities.

---

## 🌐 Live Demo : [Click Here](https://your-deployment-url.com)

> Replace with your actual deployed link (e.g., Vercel, Render, Netlify)

---

## ✨ Features

- 📝 **User Signup** – Create an account using name, email, and password  
- 🔐 **Login** – Secure login with JWT-based authentication  
- 🚪 **Logout** – Instantly log out from the system  
- ❓ **Forgot Password** – Request password reset via email  
- 🔁 **Reset Password** – Securely update your password using token-based link  
- 🧠 **Session Management** – HTTP-only cookie for enhanced security  
- 📱 **Responsive Design** – Works smoothly on mobile, tablet, and desktop  

---

## 🛠️ Tech Stack

| Technology         | Description                  |
|--------------------|------------------------------|
| **Frontend**       | React.js, Tailwind CSS (Vite)|
| **Backend**        | Node.js, Express.js          |
| **Database**       | MongoDB, Mongoose            |
| **Authentication** | JWT, Bcrypt, HTTP-only Cookies |
| **Mail Service**   | Mailtrap / Nodemailer        |
| **Environment**    | dotenv for config vars       |

---

## 📸 Screenshots

> Place your actual images in `client/public/images/`

![](client/public/images/1.png)  
![](client/public/images/2.png)  
![](client/public/images/3.png)  
![](client/public/images/4.png)  
![](client/public/images/5.png)

---

## 📁 Project Structure

Mern-Full-Auth/
├── client/ # React frontend (Vite)
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ └── ...
├── server/ # Node.js + Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── middleware/
│ └── server.js
└── README.md

bash
Copy
Edit

---

## ⚙️ Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/Harsh091234/Mern-Full-Auth.git
cd Mern-Full-Auth

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install

# 4. Create .env files in both /server and /client folders
# (see .env setup below)

# 5. Start backend server
cd ../server
npm start

# 6. Start frontend dev server (in a new terminal)
cd ../client
npm run dev
🔒 .env Setup Instructions
To run this project locally, you must set up environment variables.

🖥️ Server: server/.env
env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
APP_PASSWORD=your_email_app_password
CLIENT_URL=http://localhost:5173
MONGO_URI: MongoDB connection string (e.g., from MongoDB Atlas)

PORT: Port for Express server (default is 3000)

NODE_ENV: Set as development or production

JWT_SECRET: Secret key for JWT token signing

APP_PASSWORD: SMTP password for sending emails (Mailtrap, Gmail, etc.)

CLIENT_URL: Your frontend URL (used for CORS and email links)

💻 Client: client/.env
env
Copy
Edit
VITE_API_URL=http://localhost:3000/api
VITE_API_URL: Base URL for backend API

⚠️ Vite requires all environment variables to be prefixed with VITE_
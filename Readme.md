# 🔐 MERN Full Authentication App

A complete **Authentication System** built with the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. Includes secure user login, signup, logout, forgot password, and reset password functionalities.

---

## 🌐 Live Demo : [Click Here](https://mern-full-auth.vercel.app)

---

## ✨ Features

- 📝 **User Signup** – Create an account using name, email, and password  
- 🔐 **Login** – Secure login with JWT-based authentication  
- 🚪 **Logout** – Instantly log out from the system  
- ❓ **Forgot Password** – Request password reset via email  
- 🔁 **Reset Password** – Securely update your password using token-based link  
- 🧠 **Session Management** – HTTP-only cookie for enhanced security   

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

![](client/public/images/1.png)  
![](client/public/images/2.png)  
![](client/public/images/3.png)  
![](client/public/images/4.png)  
![](client/public/images/5.png)


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
MONGO_URI=your_mongodb_connection_string
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
APP_PASSWORD=your_email_app_password
CLIENT_URL=http://localhost:5173

💻 Client: client/.env
VITE_API_URL=http://localhost:3000/api

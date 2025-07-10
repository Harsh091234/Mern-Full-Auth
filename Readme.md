# 🔐 MERN Full Authentication App

A complete **Authentication System** built with the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. Includes secure user login, signup, logout, forgot password, and reset password functionalities.

---

## 🌐 Live Demo : [Click Here]()

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

| Technology       | Description                  |
|------------------|------------------------------|
| **Frontend**     | React.js, Tailwind CSS       |
| **Backend**      | Node.js, Express.js          |
| **Database**     | MongoDB, Mongoose            |
| **Authentication** | JWT, Bcrypt, Cookies       |
| **Mail Service** | Mailtrap / Nodemailer        |
| **Environment**  | dotenv for config vars       |

---


## 📸 Screenshots
 
![](client/public/images/1.png)

![](client/public/images/2.png)

![](client/public/images/3.png)

![](client/public/images/4.png)

![](client/public/images/5.png)


## ⚙️ Installation & Setup


# 1. Clone the repository
git clone https://github.com/Harsh091234/Mern-Full-Auth.git
cd Mern-Full-Auth

# 2. Install server and client dependencies
cd server
npm install

cd client
npm install

# 3. Create .env files in both /backend and /frontend folders
# Add necessary environment variables (PORT, MONGO_URI, JWT_SECRET, etc.)

# 4. Start the development server
# Run both frontend and backend (use two terminals)
cd server
npm start

cd client
npm run dev

---

## 🔒 Environment Variables

###  Server (`/server/.env`)

Create a `.env` file inside the `server` folder with the following variables:

MONGO_URI=your_mongodb_connection_string
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
APP_PASSWORD=your_email_app_password
CLIENT_URL=http://localhost:5173

###  Server (`/client/.env`)

Create a `.env` file inside the `client` folder with the following variables:

VITE_API_URL=http://localhost:3000/api

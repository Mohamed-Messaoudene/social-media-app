# 📌 Social Media App  
*A modern social media platform built using nodejs(expressjs) and React.*  

![social media app design](https://github.com/user-attachments/assets/4e46b0e2-fadf-417f-9641-caa64af5190a)

---
## 🌟 Live Demo  
Experience the app in action: [**Live Demo**](https://social-media-j5ch.onrender.com)  

---

## 🚀 Features  
- ✅ User Authentication (Register/Login)  
- ✅ Profile Management  
- ✅ Post Creation & Deleting  
- ✅ Comments & Likes System
- ✅ follow / unfollow friends
- ✅ Including emojis when creating posts
- ✅ Dark/Light Mode
- ✅ mangaing global state using reduce + context
- ✅ including images (profile_picture + coverture_picture + post_picture)

---

## **🛠 Tech Stack**  

| Technology  | Description |
|-------------|------------|
| **Node.js** | JavaScript runtime for backend logic |
| **Express.js** | Fast, lightweight backend framework |
| **React.js** | Frontend library for building UI components |
| **Material-UI** | Modern UI framework for styling |
| **PostgreSQL** | Relational database for structured data storage |
| **Sequelize** | ORM for managing database models and queries |
| **Vite** | Fast frontend bundler for development |

---

## **⚙️ Installation & Setup**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/Mohamed-Messaoudene/social-media-app
cd social-media-app
```
### **2️⃣ Install Backend Dependencies**  
```sh
cd server
npm install
```
Create a .env file in the server folder  and configure database credentials also other keys.
```
DATABASE_NAME = 
USER_NAME = 
PASSWORD =
HOST_NAME=

SESSION_SECRET_KEY = 
CLIENT_URL='http://localhost:5173 (default value)
SERVER_URL='http://localhost:5000' (default value)
PORT= 5000  (default value)
NODE_ENV='development'

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

```

### **3️⃣ Install Frontend Dependencies**  
```sh
cd ../client
npm install
```
Create a .env file in the client folder.

```
VITE_SERVER_URL="http://localhost:5000" (default value)
```
### **4️⃣  Start the Application**
#### *🚀 Start Backend (Node.js & Express.js)*
```sh
cd server
npm start
```
#### *🚀 Start Frontend (React & Vite)*
```sh
cd client
npm run dev
```

Your app should now be running at http://localhost:5173 (frontend) and http://localhost:5000 (backend).

## 📬 Contact  

- **👤 Name:** Messaoudene Mohamed
- **📧 Email:** [messaoudenemohamed54@gmail.com]  
- **🔗 GitHub:** [https://github.com/Mohamed-Messaoudene/]
- **🔗 LinkedIn:** [www.linkedin.com/in/mohamed-messaoudene-ab595a269]  


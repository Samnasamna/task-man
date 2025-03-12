# **Task Manager** 

A full-stack task management application with **CRUD functionality** and **JWT-secured authentication**, built using **React (frontend)** and **Node.js/Express (backend)**.  

## ** Features**  
- User authentication with **JWT** (Login, Register, Logout)  
- **Create, Read, Update, Delete (CRUD)** functionality for tasks  
- **Secure API** with protected routes  
- **User-friendly UI** built with React  
- **Responsive design** for all devices  
- **Deployed on Vercel (frontend) & Render (backend)**  

## **Tech Stack**  
- **Frontend:** React, Axios, React Router  
- **Backend:** Node.js, Express.js, MongoDB, JWT, bcrypt  
- **Deployment:** Vercel (Frontend), Render (Backend)  

## **Installation & Setup**  

### **Clone the Repository**  
```sh
git clone https://github.com/yourusername/task-man.git
cd task-man
```
### **Backend Setup**
```sh
cd backend
npm install
```
**create .env file and add it in the backend**
```sh
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CORS_ORIGIN=https://your-frontend-url.vercel.app
```
**to start the backend**
```sh
npm run dev
```

### **Frontend Setup**
```sh
cd frontend
npm install
```
**create .env file and add it in the frontend**
```sh
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```
**to start the backend**
```sh
npm run dev 
```



![image](https://github.com/user-attachments/assets/6cb6f102-e583-452f-956e-7276d38eb6cf)


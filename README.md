<div align="center">


# 🛒 MERN E-commerce Platform


### *A Full-Stack E-commerce Web Application Built with MERN Stack*


[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Powered by Node.js](https://img.shields.io/badge/Powered%20by-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![API Integration](https://img.shields.io/badge/API-RESTful-blue?style=for-the-badge)]()
[![Responsive Design](https://img.shields.io/badge/Design-Responsive-4ECDC4?style=for-the-badge)](/)
[![Live Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge)](https://mern-ecommerce-platform-azure.vercel.app)


🛒 **A modern e-commerce platform built with React, Node.js, Express, and MongoDB, featuring user authentication, product management, shopping cart, and order processing.**


[🚀 Live Demo](https://mern-ecommerce-platform-azure.vercel.app) • [📖 Documentation](#-features) • [🤝 Contributing](#-contributing) • [💻 GitHub](https://github.com/yourusername/your-repo)



</div>


---


## ✨ About The Project


An ambitious **full-stack MERN e-commerce platform** that supports:

- Secure user registration and authentication
- Product listings, details, and management
- Shopping cart with dynamic updates
- Order creation and processing workflows
- Responsive UI built with React and Material-UI
- RESTful API architecture with Express backend
- MongoDB Atlas for database management


### 🎯 Why This Project?


- **🔒 Secure Authentication**: JWT-based login and role management
- **🛍️ E-commerce Features**: Complete shopping experience from cart to order
- **⚡ Scalable**: Backend APIs designed for performance and extensibility
- **📱 Mobile Friendly**: Responsive UI using Material-UI libraries
- **🌐 Modern Stack**: Leveraging React hooks, Node.js, and MongoDB Atlas


---


## 🚀 Live Demo & Features


## 🚀 Key Features

| 🛒 Frontend Features                                  | ⚙️ Backend Features                                  |
|-----------------------------------------------------|-----------------------------------------------------|
| ✅ Product browsing with categories and searching   | ✅ RESTful API for products, users, orders, reviews |
| ✅ User authentication and profile management       | ✅ Protected routes with JWT and role-based access  |
| ✅ Shopping cart functionality                        | ✅ Product CRUD with Cloudinary image uploads       |
| ✅ Order placement and order history                 | ✅ Order processing and management                   |
| ✅ Responsive UI for all device sizes                 | ✅ Reviews and ratings management                    |
| ✅ Admin dashboard for product and order management | ✅ Email notifications via SMTP/Gmail                 |

| 🌐 Scalability & Performance                          |                                                     |
|-----------------------------------------------------|-----------------------------------------------------|
| ✅ Cloud-hosted MongoDB Atlas database               |                                                     |
| ✅ Redux Toolkit for efficient frontend state        |                                                     |
| ✅ API features: pagination, filtering, sorting      |                                                     |
| ✅ Comprehensive error handling                       |                                                     |



### 🛒 Frontend Features
- ✅ Product browsing with categories and searching
- ✅ User login, registration, and profile management
- ✅ Shopping cart and order placement UI
- ✅ Responsive design for all device sizes
- ✅ Admin dashboard for product and order management


</td>
<td width="50%">


### ⚙️ Backend Features
- ✅ REST API routes for products, orders, users, reviews
- ✅ Authentication with JWT tokens and protected routes
- ✅ Role-based access control (admin/user)
- ✅ Image uploads with Cloudinary integration
- ✅ Email notifications for users (SMTP/Gmail)


</td>
</tr>
</table>



---


## 🛠️ Built With


<div align="center">


### **Frontend Stack**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Material UI](https://img.shields.io/badge/Material_UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)


### **Backend Stack**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge)


### **Deployment & Version Control**
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-1E90FF?style=for-the-badge)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)


</div>


---


## 🚀 Getting Started


### 📋 Prerequisites


Make sure you have the following installed on your machine:


- **Node.js** v18.0+ - [Download here](https://nodejs.org/)
- **npm** v9.0+ - (Comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- **Modern Web Browser** - Chrome, Firefox, Safari, or Edge


### ⚡ Installation & Setup


Follow these simple steps to get your development environment running:


1️⃣ Clone the repository  

git clone https://github.com/Ujwal-27K/mern-ecommerce-platform


2️⃣ Navigate to project directory  

cd your-repo

3️⃣ Install backend dependencies  

cd backend
npm install

4️⃣ Install frontend dependencies  

cd ../frontend
npm install

5️⃣ Start both backend and frontend servers for development  

In separate terminals
cd backend && npm start
cd frontend && npm start


6️⃣ Open your browser at [http://localhost:3000](http://localhost:3000)

### 🌐 Production Deployment

#### Backend Deployment (Render)
1. Create new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Set root directory to `backend`
6. Add environment variables (see below)

#### Frontend Deployment (Vercel)
1. Import project from GitHub on Vercel
2. Set framework preset to "Create React App"
3. Set root directory to `frontend`
4. Add environment variables (see below)

### 🔧 Environment Variables

#### Backend (Render) Environment Variables:
```env
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-frontend-domain.vercel.app

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database

JWT_SECRET=your_super_secure_jwt_secret_256_bits_minimum
JWT_EXPIRE=15m
JWT_REFRESH_SECRET=your_super_secure_refresh_secret_256_bits_minimum
JWT_REFRESH_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM="ShopMERN <your_gmail_address@gmail.com>"
```

#### Frontend (Vercel) Environment Variables:
```env
REACT_APP_API_URL=https://your-backend-domain.onrender.com/api
```

### 👥 Default Admin User
After running the seed script:
- Email: `admin@example.com`
- Password: `Admin@123`


---


## 📖 Usage Guide


### 🛒 Frontend Usage


- Browse products, add to cart, manage account
- Place and track orders
- Responsive UI adapts from mobile to desktop


### ⚙️ Backend API


- RESTful routes for products, users, orders, reviews
- Protected routes with JWT authentication
- Admin-only routes for management


---


## 🤝 Contributing


We welcome contributions! Please follow these steps:


1️⃣ Fork the repo on GitHub  
2️⃣ Create a feature branch  
3️⃣ Make your changes and commit  
4️⃣ Push to your fork and open a pull request


Please adhere to the existing code style and include tests for new features!


---


## 📄 License


This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.


---


## 🙏 Acknowledgements


- Thanks to the React, Node.js, and MongoDB communities  
- Inspired by modern e-commerce design patterns  
- Hosted on Vercel and Render for seamless deployment  


---

<div align="center">

### © 2025 Ujwal Khairnar

</div>

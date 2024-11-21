##TechLord: The Ultimate E-Commerce Platform for Technology Enthusiasts
##Project by: Hidsaan Majeed

##Description:
TechLord is a comprehensive e-commerce platform designed for technology enthusiasts. It provides users with the ability to buy and sell new and used tech products while staying updated with the latest technological news through an integrated news API. The platform focuses on security, user-friendly design, and seamless functionality.

##Table of Contents:
-Description
-Features
-Technologies Used
-Installation
-Usage
-Testing
-Future Enhancements

##Features:
-Buying and Selling: Easily browse, search, and filter tech products.
-Tech News Integration: Stay updated with the latest tech news from an external API.
-Secure User Authentication: Sign-up, login, and password management secured with bcrypt and JWT tokens.
-Admin Management: Admins can manage products, users, and orders using Redux.
-Image Uploads: Secure storage using Cloudinary and Multer middleware.
-Password Recovery: Secure email verification using Nodemailer.
-Notifications: User-friendly notifications with React Toastify.

##Technologies Used:
##Frontend:
-React.js: Dynamic and responsive user interfaces.
-HTML5 & SASS: Clean and consistent styling.
##Backend:
-Express.js: Server-side logic and APIs.
-Node.js: Backend framework for scalable applications.
##Database:
-MongoDB: Efficient data storage and retrieval.
##Tools & Libraries:
-Axios: Handling HTTP requests.
-React Router DOM: Navigation and routing.
-Redux: State management for admin components.
-Dotenv: Secure environment variable storage.
-Postman: Backend API testing.

##Installation:
##Prerequisites:
Install Node.js and MongoDB.
##Steps:
#Clone the Repositories:
-git clone https://github.com/hidsaan/TechLord-Back-End.git
-git clone https://github.com/hidsaan/TechLord-Front-End.git
#Backend Setup: 
-Navigate to the backend directory
-cd TechLord-Back-End
#Install dependencies:
-npm install
#Start the server:
-npm run dev
#Frontend Setup:
-Navigate to the frontend directory
-cd TechLord-Front-End
#Install dependencies:
-npm install
#Start the application:
-npm start

##Usage:
Launch the app in your browser at http://localhost:3000.
Register or log in to explore the available features.
Admins can manage users, products, and orders from the admin dashboard.

##Testing:
Backend API testing is performed using Postman.
Frontend testing includes responsiveness and feature functionality checks.
-Run unit tests for the frontend components:
npm run test

##Future Enhancements:
-Chatbot Integration: For tech discussions.
-Expert Advice Section: Personalized recommendations.
-Service Center Locator: Help users find nearby service centers.
-Mobile Application: Development for accessibility on mobile devices.

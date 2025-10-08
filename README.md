# 💇‍♀️ Salon Booking System

A **Full-Stack Salon Booking Application** built with a **Microservices architecture** using **Spring Boot** (backend) and **React.js** (frontend).  
This system allows users to **book salon services**, **make secure payments**, **manage appointments**, and **streamline salon operations** efficiently.

---

## 🚀 Key Features

✨ **Microservices Architecture** — Independent modules for User, Booking, Payment, Review, and Notifications.  
💳 **Payment Gateway Integration** — Seamless and secure online payments for bookings.  
👥 **Authentication & Authorization** — Role-based access with **Spring Security** and **Keycloak**.  
📅 **Appointment Booking System** — Browse salons, choose services, and book conveniently.  
💬 **Notifications Service** — Email/SMS alerts for confirmations and updates.  
💈 **Salon & Service Management** — Admins can easily add, edit, or manage services.  
⭐ **Customer Reviews & Ratings** — Collect feedback and improve service quality.  
🌐 **API Gateway & Discovery** — Centralized routing with **Spring Cloud Gateway** and **Eureka Server**.  
⚙️ **Centralized Configuration** — Simplified maintenance and scalability.  
🪄 **Modern UI** — Built with **React.js** + **TailwindCSS** for speed and responsiveness.  

---

## 🏗️ Project Architecture

```
frontend/                     → React.js (User Interface)
backend (microservices)/
 ├── booking/                 → Handles appointment creation & tracking
 ├── category/                → Manages salon categories
 ├── salon/                   → Salon details and operations
 ├── service-offering/        → Defines available services
 ├── payment/                 → Handles payment gateway and transactions
 ├── review/                  → Customer reviews and ratings
 ├── user-service/            → Authentication & user management (Keycloak)
 ├── notifications/           → Sends booking updates and alerts
 ├── gateway-server/          → API Gateway (Spring Cloud Gateway)
 └── eurekaserver/            → Service registry for microservices
```

---

## 🧰 Tech Stack

**Frontend**
- ⚛️ React.js  
- 🎨 TailwindCSS  
- 🔗 Axios (REST API integration)  

**Backend (Microservices)**
- ☕ Spring Boot  
- ☁️ Spring Cloud (Eureka, Gateway, Config)  
- 🔒 Spring Security / Keycloak  
- 🗃️ JPA / Hibernate  
- 🧮 MySQL Database  
- 🧩 Maven  

**Integrations**
- 💰 Payment Gateway API  
- 📧 Notification Service (Email/SMS)  
- 🔐 JWT Authentication  

---

## ⚙️ Installation & Setup

### 🖥️ Backend (Spring Boot)
```bash
# Navigate to backend folder
cd backend

# Build all microservices
mvn clean package -DskipTests

# Run each microservice
cd booking
mvn spring-boot:run
```
> Ensure **Eureka Server** and **Gateway Server** are running before starting other services.

---

### 💻 Frontend (React)
```bash
cd frontend
npm install
npm start
```
Access the app at 👉 **http://localhost:3000**

---

## 🧪 API Highlights

| Service | Description | Example Endpoint |
|----------|--------------|------------------|
| Booking Service | Manage bookings | `/api/bookings` |
| Payment Service | Handle transactions | `/api/payments` |
| User Service | Authentication & Profiles | `/api/users` |
| Review Service | Manage reviews | `/api/reviews` |
| Notification Service | Sends alerts | `/api/notifications` |

---

## 🔐 Security

- 🔑 **Role-based Access Control** (Admin / User / Salon Owner)  
- 🔒 **JWT Authentication** via Keycloak  
- 🧂 **Password Encryption** using BCrypt  
- 🧱 **Gateway Authentication Filter** for secure routing  

---

## 📸 Screenshots

---

## 💡 Future Enhancements

🚢 Docker & Kubernetes deployment  
📧 Email notifications via SendGrid  
📊 Analytics dashboard for salon owners  
🤖 AI-based service recommendations  

---

## 👨‍💻 Author

**Akhil Singh**  
📍 Developer — Salon Booking System  
🔗 [GitHub Profile](https://github.com/akhils-4)

---

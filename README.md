# 📱 Srinidhi Mart - Full-Stack Mobile Shopping Website

Welcome to **Srinidhi Mart**, a complete, modern, full-stack mobile phone e-commerce web application built from scratch with **Java 21**, **Spring Boot 3**, **Maven**, **MySQL**, and a responsive **HTML5 / CSS3 / JavaScript** frontend.

---

## 🌟 Key Features

### 🖥️ Frontend Features
1. **Modern Mobile Shopping Homepage**: Beautiful hero section with promotional banners, trust badges, and brand highlights.
2. **Product Catalog**: High-resolution smartphone cards displaying device image, full name, price, original price, discount percentage, RAM, storage, battery, camera, and ratings.
3. **Brand Filtering**: Instant single-click brand filters for Apple, Samsung, OnePlus, Google, Nothing, Xiaomi, Vivo, and Realme.
4. **Live Search & Sorting**: Real-time smartphone search by title/keywords and sorting by *Price: Low to High*, *Price: High to Low*, and *Customer Ratings*.
5. **Product Details View**: Deep-dive popup modal showcasing high-res photos, in-depth specifications (processor, battery, camera, RAM, ROM), stock availability, and user reviews.
6. **Smart Shopping Cart**:
   - Add to Cart, increment/decrement quantity, and remove items.
   - Live badge counter in the top navigation bar.
   - Automatic calculation of **Subtotal**, **5% GST Tax**, **Free Express Delivery** (for orders over ₹999), and **Promotional Coupons** (`WELCOME10` for 10% off, `FESTIVE20` for 20% off).
7. **User Authentication**:
   - Secure registration and login forms with real-time validation.
   - Session persistence in local storage.
   - Quick one-click "Fill Demo User" and "Fill Demo Admin" buttons for testing.
8. **Demo Checkout**:
   - Complete shipping address form (Name, Email, Phone, Address, City, State, PIN).
   - Demo payment methods: **UPI / QR Code** (Google Pay, PhonePe, Paytm), **Credit/Debit Cards**, **Net Banking**, and **Cash on Delivery (COD)**.
   - *Note: No real payments are processed; verified order numbers are simulated.*
9. **Order Confirmation & Tracking**:
   - Order confirmation dialog with unique order number (`SNM-YYYYMMDD-XXXX`), delivery date estimate (3-5 days), itemized receipts, and receipt print feature.
   - "My Orders" order history tracking modal.
10. **Fully Responsive Design**: Fluid layout tested across mobile smartphones, tablets, and widescreen desktop monitors.

---

### ⚙️ Backend Features
1. **Spring Boot REST APIs**: Clean layered architecture (Controllers -> Services -> Repositories -> JPA Entities).
2. **Spring Data JPA & Hibernate**: Object-relational mapping to MySQL database.
3. **Zero Plain-Text Passwords**: All user passwords are encrypted using `BCryptPasswordEncoder` (industry-standard salt and hash).
4. **Resilient Database Configuration**:
   - Connects to **MySQL** by default (`srinidhi_mart`).
   - Also includes an **H2 In-Memory profile** allowing you to run and test the application immediately without installing MySQL first!
5. **Auto Data Seeding (`DataInitializer.java`)**: Pre-populates 12 flagship smartphones and sample demo accounts automatically upon first startup.
6. **Centralized Exception Handling (`@RestControllerAdvice`)**: Consistent, developer-friendly JSON error messages with HTTP status codes.
7. **Cross-Origin Resource Sharing (CORS)**: Enabled across all endpoints so the frontend can be served either directly by Spring Boot or via VS Code Live Server.

---

## 🛠️ Required Software to Install (on Windows)

You only need the following free software tools:

| Software | Version | Purpose | Download Link |
|---|---|---|---|
| **Java JDK** | 21 (LTS) | Runs the Java Backend | [Oracle JDK 21](https://www.oracle.com/java/technologies/downloads/#java21) or [Adoptium Temurin 21](https://adoptium.net/) |
| **Apache Maven** | 3.9+ | Builds the project | [Maven Download](https://maven.apache.org/download.cgi) *(already installed on your machine!)* |
| **MySQL Server** or **XAMPP** | 8.0+ | Database engine | [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) or [XAMPP](https://www.apachefriends.org/) |
| **Web Browser** | Any | Runs the shopping website | Chrome, Edge, Firefox, Brave |

*(Note: Your PC already has **Java 21** and **Apache Maven 3.10.0** installed!)*

---

## 🚀 How to Run Srinidhi Mart on Windows

### Method 1: Instant Quick Start (No MySQL Setup Required!)
If you want to run and test the complete application right now without setting up MySQL first, you can use the built-in **H2 In-Memory Database Mode**:

1. Open **Command Prompt** or **PowerShell** inside the project folder:
   ```powershell
   cd "C:\Users\acer\Downloads\SRII MART"
   ```
2. Double-click `run-app-h2.bat` OR run this command in terminal:
   ```powershell
   java -jar target/srinidhi-mart-1.0.0.jar --spring.profiles.active=h2
   ```
   *(Or using Maven: `mvn spring-boot:run "-Dspring-boot.run.profiles=h2"`)*

3. Open your web browser and go to:
   ```
   http://localhost:8080
   ```
   🎉 The Srinidhi Mart mobile shopping website is live!

---

### Method 2: Running with MySQL Database

#### Step 1: Start MySQL Server
- If using **XAMPP**: Open XAMPP Control Panel and click **Start** next to **MySQL**.
- If using **MySQL Community Server**: Ensure the `MySQL80` service is running in Windows Services.

#### Step 2: Create the Database & Tables
1. Open **MySQL Workbench**, **phpMyAdmin** (`http://localhost/phpmyadmin`), or MySQL Command Line:
   ```sql
   CREATE DATABASE IF NOT EXISTS srinidhi_mart;
   ```
2. *(Optional)* Run the SQL scripts provided in the `database/` folder:
   - `database/schema.sql` (Creates all tables)
   - `database/data.sql` (Inserts initial sample products and demo users)
   *(Note: Spring Boot's `DataInitializer` will also automatically create and populate tables if they do not exist!)*

#### Step 3: Configure Database Credentials (if different from default)
Open `src/main/resources/application-mysql.properties` and verify your username and password:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/srinidhi_mart?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
```
*(If your MySQL root user has no password, change `spring.datasource.password=` to blank).*

#### Step 4: Run the Application
Double-click `run-app-mysql.bat` OR execute in PowerShell:
```powershell
java -jar target/srinidhi-mart-1.0.0.jar --spring.profiles.active=mysql
```
Or with Maven:
```powershell
mvn spring-boot:run
```

Open your browser at:
```
http://localhost:8080
```

---

## 🔑 Demo Login Credentials

You can log in using these pre-configured test accounts (or click **"Fill Demo User"** in the login modal):

| Account Type | Email | Password | Role |
|---|---|---|---|
| **Demo Customer** | `user@srinidhimart.com` | `password123` | ROLE_USER |
| **Demo Administrator** | `admin@srinidhimart.com` | `admin123` | ROLE_ADMIN |

You can also click **"Register New Account"** to create any new customer account with your own email and details!

---

## 🎟️ Active Demo Promo Coupons

Enter these coupon codes in the shopping cart drawer for instant discounts:
- `WELCOME10` — **10% OFF** your total order
- `FESTIVE20` — **20% OFF** festive discount

---

## 📂 Project Folder Structure

```
SRII MART/
├── pom.xml                                  <- Maven dependencies & build configuration
├── README.md                                <- Complete documentation and setup guide
├── run-app-h2.bat                           <- One-click Windows starter (H2 mode)
├── run-app-mysql.bat                        <- One-click Windows starter (MySQL mode)
├── database/
│   ├── schema.sql                           <- MySQL DDL schema (5 tables)
│   └── data.sql                             <- Initial sample mobile products & demo users
├── frontend/                                <- Standalone copy of frontend (for VS Code Live Server)
│   ├── index.html
│   ├── css/style.css
│   └── js/ (api.js, app.js, cart.js, auth.js, checkout.js)
├── src/
│   ├── main/
│   │   ├── java/com/srinidhimart/
│   │   │   ├── SrinidhiMartApplication.java <- Spring Boot Entry Point
│   │   │   ├── config/
│   │   │   │   ├── SecurityConfig.java      <- BCrypt Password Encoder & Security Filter
│   │   │   │   ├── CorsConfig.java          <- Cross-Origin Configuration
│   │   │   │   └── DataInitializer.java     <- Seeds 12 phones and users on first run
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java      <- /api/auth (register, login, me)
│   │   │   │   ├── ProductController.java   <- /api/products (catalog, filter, search)
│   │   │   │   ├── CartController.java      <- /api/cart (add, update, remove, clear)
│   │   │   │   └── OrderController.java     <- /api/orders (place, fetch, track)
│   │   │   ├── dto/                         <- Request & Response Data Transfer Objects
│   │   │   ├── exception/                   <- ResourceNotFound, GlobalExceptionHandler
│   │   │   ├── model/                       <- JPA Entities (User, Product, CartItem, Order, OrderItem)
│   │   │   ├── repository/                  <- Spring Data JPA Repositories
│   │   │   └── service/                     <- Business logic layer
│   │   └── resources/
│   │       ├── application.properties       <- Base Spring configuration
│   │       ├── application-mysql.properties <- MySQL connection settings
│   │       ├── application-h2.properties    <- In-memory testing settings
│   │       └── static/                      <- Embedded Web Frontend (served at port 8080)
│   │           ├── index.html
│   │           ├── css/style.css
│   │           └── js/
│   │               ├── api.js
│   │               ├── app.js
│   │               ├── auth.js
│   │               ├── cart.js
│   │               └── checkout.js
│   └── test/
│       └── java/com/srinidhimart/
│           └── SrinidhiMartApplicationTests.java <- Spring Boot context load test
└── target/
    └── srinidhi-mart-1.0.0.jar              <- Packaged ready-to-deploy JAR file
```

---

## 📡 REST API Reference

All backend REST APIs are available under the `/api` prefix:

### 1. Products API
- `GET /api/products` — Retrieve products with optional query parameters (`search`, `brand`, `minPrice`, `maxPrice`, `sortBy`)
- `GET /api/products/{id}` — Retrieve a single smartphone by ID
- `GET /api/products/brands` — Get list of distinct smartphone brands
- `GET /api/products/featured` — Get featured smartphone collection
- `POST /api/products` — Add a new smartphone (JSON body)

### 2. Authentication API
- `POST /api/auth/register` — Register a new user (`name`, `email`, `password`, `phone`, `address`)
- `POST /api/auth/login` — Authenticate user and receive token (`email`, `password`)
- `GET /api/auth/me?userId={id}` — Fetch profile details

### 3. Shopping Cart API
- `GET /api/cart?userId={id}` — Retrieve all items in the user's cart
- `POST /api/cart/add?userId={id}` — Add item to cart (`productId`, `quantity`)
- `PUT /api/cart/{itemId}?userId={id}&quantity={qty}` — Update item quantity
- `DELETE /api/cart/{itemId}?userId={id}` — Remove item from cart
- `DELETE /api/cart/clear?userId={id}` — Empty cart

### 4. Orders API
- `POST /api/orders` — Place a new order with shipping details & items
- `GET /api/orders?userId={id}` — Retrieve all orders placed by user
- `GET /api/orders/{id}` — Get order details by primary key
- `GET /api/orders/track/{orderNumber}` — Track order by unique code (e.g. `SNM-261010-8156`)

---

## 🧪 Testing the Project

All unit and integration tests can be executed at any time with:
```powershell
mvn test
```
The test suite validates that:
- The Spring ApplicationContext initializes cleanly.
- Spring Data JPA repositories map tables and constraints correctly.
- BCrypt password encoder encrypts and verifies passwords.
- Sample phones and demo users are seeded properly.

---

## 💡 Troubleshooting & Tips

- **Port 8080 already in use**: If another program is using port 8080, you can change the port in `src/main/resources/application.properties` by setting `server.port=8081`.
- **MySQL Access Denied**: Double-check your MySQL root password in `src/main/resources/application-mysql.properties`.
- **Want to re-build the JAR file?**: Run `mvn clean package "-DskipTests"`.

---

© 2026 Srinidhi Mart. Built for beginners to learn full-stack Java, Spring Boot, MySQL, and modern web frontend development.

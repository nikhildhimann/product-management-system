# Product Management System

This is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to manage products. It features a responsive frontend, a robust backend, and real-time updates with Socket.io.

## Features

* **User Authentication:** Users can register, log in, and manage their profiles. Passwords are encrypted using bcryptjs.
* **Product Management:** Authenticated users can create, read, update, and delete products.
* **Real-time Updates:** The dashboard is updated in real-time using Socket.io for things like user count and total sales.
* **Image Uploads:** Users can upload images for products, which are stored on the server.
* **Protected Routes:** Frontend routes are protected to ensure only authenticated users can access certain pages.
* **Email Notifications:** Users receive a welcome email upon registration.

## Tech Stack

**Frontend:**

* React
* React Router
* Axios
* Socket.io-client
* Bootstrap
* React-Bootstrap

**Backend:**

* Node.js
* Express
* MongoDB
* Mongoose
* JWT (JSON Web Tokens)
* Socket.io
* Nodemailer

## Getting Started

### Prerequisites

* Node.js and npm
* MongoDB

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/nikhildhimann/product-management-system.git](https://github.com/nikhildhimann/product-management-system.git)
    ```
2.  **Install frontend dependencies:**
    ```bash
    cd fronte
    npm install
    ```
3.  **Install backend dependencies:**
    ```bash
    cd ../Back
    npm install
    ```
4.  **Set up environment variables:**

    Create a `.env` file in the `Back` directory and add the following:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```
    Create a `.env` file in the `fronte` directory and add the following:
    ```
    VITE_API_URL=http://localhost:5000
    ```
5.  **Run the application:**

    * **Backend:**
        ```bash
        cd Backend
        npm run dev
        ```
    * **Frontend:**
        ```bash
        cd frontend
        npm run dev
        ```


6. **Scren shots:**

    **Home page:**
    ![Home page]("./Screen-Shots/1.png)

    **Add Product page:**
    ![Add Product page]("./Screen-Shots/3.png)

    **Dashboard page:**
    ![Dashboard page]("./Screen-Shots/2.png)



## Contributing

Contributions are welcome! Please see the `CONTRIBUTING.md` file for more details.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
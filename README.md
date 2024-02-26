# E-Shop

This is a full-stack E-Commerce project built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to browse products, add them to their cart, and complete the checkout process.

## Features

- User authentication: Register, Log in, Log out and Reset Password
- Role based routing for user and admin
- Admin dashboard for managing products, categories, orders, and users (performed CRUD operation)
- User dashboard for their order and order status
- Browse through available products, view details, and add them to the cart.
- Related products available when checking for more details of a particular product
- Shopping cart: Manage items in the cart and remove items
- Filter product on basis of category and price range
- Integrated Payment Gateway (Braintree)

## Technologies Used

- React.js: JavaScript library for building user interfaces
- Express.js: Node.js web application framework for building APIs
- Node.js: JavaScript runtime environment for running server-side code
- MongoDB: NoSQL database for storing data
- Axios: Promise-based HTTP client for making API requests
- JSON Web Tokens (JWT): For user authentication
- bcrypt: Library for hashing passwords
- Bootstrap: CSS framework for styling UI components
- UI Library: Ant Design
- Braintree: For payment gateway

## Folder Structure

- `client`: React.js frontend code
- `server`: Node.js/Express.js backend code

## Setup For Complete Project (Frontend + Backend)

1. **Clone the repository**
2. **Install dependencies for Frontend**
   - cd `client`
   - `npm i`
3. **Install dependencies for Backend**

   - cd `server`
   - `npm i`

4. **Set up environment variables: Backend**

   Create a `.env` file in the server directory and add set your own environment variables as shown in the `sample.env` file. For setting environment for payment use braintree[https://www.braintreepayments.com/sandbox]

5. **Set up environment variables: Frontend**

   Create a `.env` file in the client directory and add `REACT_APP_BASEURL=http://localhost:8000` i.e url of your server or backend

6. **To run locally**
   - cd client and run `npm start` (for frontend)
   - cd server and run `npm run start:dev` (for backend)

## Setup For Frontend Part Only

1. **Clone the repository**

   - Only client directory is required. You can remove the server directory

2. **Install dependencies for Frontend**

   - cd `client`
   - `npm i`

3. **Set up environment variables: Frontend**

   Create a `.env` file in the client directory and add `REACT_APP_BASEURL=https://e-shop-backend-akb.vercel.app` i.e url of my backend api

4. **To run locally**
   - cd client and run `npm start`

<<<<<<< HEAD
# MERN Stack Tour Management Application

This is a full-stack MERN (MongoDB, Express, React, Node.js) application for managing tours, bookings, user authentication, reviews, and more.

## Project Structure

- `backend/`: Express server with REST API routes, controllers, models, and utilities.
- `frontend/`: React application for the user interface.
- `backend/routes/`: API route definitions.
- `backend/controllers/`: Business logic for handling requests.
- `backend/models/`: Mongoose schemas and models.
- `frontend/src/`: React components, pages, services, and assets.

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node package manager)
- MongoDB Atlas or local MongoDB instance

## Setup and Run

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following variables:
   ```
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   WEATHER_API_KEY=your_weather_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Start the backend server:
   ```
   node index.js
   ```

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies (use legacy peer deps flag if needed):
   ```
   npm install --legacy-peer-deps
   ```

3. Start the React development server:
   ```
   npm start
   ```

## Testing

- Backend tests can be run using Jest (if configured).
- Frontend tests require Jest configuration.

## Features

- User authentication and authorization
- Tour management (create, update, delete, search)
- Booking system
- Reviews and ratings
- Image gallery upload
- Newsletter subscription with Stripe payment integration
- Weather forecast API integration

## Output
![weather](https://github.com/user-attachments/assets/fd19f456-e272-489f-95c6-dae166d94909)
![gallery](https://github.com/user-attachments/assets/032d0a2e-dd84-4d29-afd3-ca8018dfbc60)
![mobile responsive](https://github.com/user-attachments/assets/d317f1c5-5b54-4a78-baf7-8a2f083387e6)
![subscribe](https://github.com/user-attachments/assets/73fc9b01-be84-4ebd-b9b1-6799273d8a83)
![main](https://github.com/user-attachments/assets/b69fd3aa-27b3-43eb-8203-3f852e785c8e)

=======
# Travel-Management
>>>>>>> d5f4d53f4f594e05ca8853843d71e4c445f2a9c0

# Book database
This is a full-stack web application built with PostgreSQL, Express, Node.js and React (Vite). The project is fully containerized with Docker for easy setup and local development.

## Overview
The app allows users to manage their personal book collections, including owned books and wishlisted books. Users can add, edit, delete and search books by title, author, series name, or custom categories. They can also add notes about book appearances (for example, if they want the same book in a different cover). This makes it easy for collectors to keep track of what they already own.

## Technologies used
- Frontend: React (Vite), CSS
- Backend: Node.js (Express), Knex.js
- Database: PostgreSQL
- Containerization: Docker & Docker Compose

## Prerequisites
Make sure the following are installed on your system:
- Docker
- Node.js and npm

## Environment variables
Create a .env file in the root directory with the following values:
- POSTGRES_USER=yourusername
- POSTGRES_PASSWORD=yourpassword
- POSTGRES_DB=yourdb
- JWT_SECRET=somethingsecret
- REFRESH_TOKEN_SECRET=somethingelsesecret
- NODE_ENV=development

(Note: VITE_API_URL is not required for development mode)

## Running the project (development mode)
### Start only the PostgreSQL database:
**docker compose up -d database**

### Run the backend:
**cd backend**<br>
**npm install** (Run only the first time)<br>
**npm run dev** (Starts backend at http://localhost:5000)<br>

### Run the frontend:
**cd frontend**<br>
**npm install** (Run only the first time)<br>
**npm run dev** (Starts frontend at http://localhost:5173)<br>

## Database management
### Find your database container name
**docker ps**

### Connect to the database
**docker exec -it database-container-name psql -U yourusername -d yourdb**

## Run migrations and seed data
**cd backend**<br>
**npx knex migrate:latest**<br>
**npx knex seed:run**<br>

## Test accounts
You can log in using any of the following pre-configured test users:<br>
- testi1@gmail.com
- testi2@gmail.com
- testi3@gmail.com

All test accounts use the same password: Password1!

Each account comes with sample book data so you can explore all app features right away.
You can also create your own account to test the app from scratch.

## Notes
- The Docker Compose setup in this project is meant for development use only.
- Before running the app, make sure to run the database migrations and seed data so everything is set up correctly.
- The app and all test data are in Finnish.

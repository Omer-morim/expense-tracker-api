# Expense Tracker API

This project is a RESTful API built with Node.js and Express, designed for tracking and managing personal or team-related expenses.  
It was developed as part of an academic project in the Computer Science degree at HIT.

---

## Features

- User management (create, read, update, delete)
- Expense tracking with monthly reports
- Clean, modular route and model structure
- MongoDB database integration using Mongoose
- Environment variable support via `.env` file
- Basic testing and auto-generated documentation using JSDoc

---

## Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- JavaScript 
- dotenv
- body-parser
- JSDoc

---

## Project Structure

cost_manager/
├── index.js             # Application entry point  
├── routes/              # Route handlers (users, costs, about)  
├── models/              # Mongoose schemas and models  
├── mockData.js          # Sample data  
├── tests/               # Basic test suite  
├── docs/                # JSDoc-generated documentation  
├── .env                 # Configuration file (not tracked)  
├── package.json  
└── tsconfig.json       

---

## Getting Started

1. Clone the repository

   git clone https://github.com/Omer-morim/expense-tracker-api.git  
   cd expense-tracker-api

2. Install dependencies

   npm install

3. Create a `.env` file

   Add the following configuration with your MongoDB URI:

   MONGO_URI=mongodb+srv://<your-mongo-uri>  
   PORT=3000

4. Run the application

   node index.js

---

## API Endpoints

| Method | Endpoint                        | Description                   |
|--------|----------------------------------|-------------------------------|
| GET    | `/api/about`                    |  team information   |
| GET    | `/api/users/:id`                | Get user data by ID           |
| GET    | `/api/report?id=&year=&month=`  | Monthly cost report per user  |

---

## Running Tests

Run the test suite using:

   npm test

---


## Author

**Omer Morim**  
B.Sc. in Computer Science  
[LinkedIn](https://www.linkedin.com/in/omer-morim/)

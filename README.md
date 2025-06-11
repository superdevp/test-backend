# Test Backend Project

This is a simple backend project built using **Node.js**, **Express**, and **Mongoose**. It serves as a starter template for creating RESTful APIs with MongoDB as the database.

## Tech Stack

- **Node.js** – Typescript runtime
- **Express** – Web framework for building APIs
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/superdevp/test-backend.git
cd test-backend
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Configure Environment Variables
Crate a `.env` file in the root directory and add the following:
```env
PORT=xxx
MONGO_URI=xxx
JWT_SECRET=xxx
```
## Scripts
### Build the Project
```bash
npm run build
```
### Start the Server
```bash
npm start
```
### Start the Server with Dev mode
```bash
npm run dev
```
The server will run on `http://localhost:5000` (or the port you specify in `.env`).

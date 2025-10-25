# Calculator Web App

A full-stack calculator web application with a Node.js/Express backend and vanilla JavaScript frontend.

## Features

- Basic arithmetic operations (add, subtract, multiply, divide)
- Advanced operations (modulo, power, square root)
- Calculation history stored in PostgreSQL database
- RESTful API backend
- Clean and responsive UI

## Backend

The backend is built with Node.js and Express, using PostgreSQL (Neon) for data storage.

### API Endpoints

- `GET /health` - Health check
- `POST /api/calculate` - Perform calculation
- `GET /api/history` - Get calculation history
- `DELETE /api/history` - Clear calculation history
- `GET /api/operations` - Get available operations

### Backend URL
https://calculator-backend-morphvm-upq2ibiu.http.cloud.morph.so

### Running the Backend

```bash
cd backend
npm install
npm start
```

## Frontend

The frontend is built with vanilla JavaScript, HTML, and CSS.

### Running the Frontend

```bash
cd frontend
# Serve the files with any static file server
```

## Database

The app uses Neon PostgreSQL database to store calculation history.

## Tech Stack

- **Backend**: Node.js, Express, PostgreSQL (Neon)
- **Frontend**: HTML, CSS, JavaScript
- **Deployment**: Morph VPS


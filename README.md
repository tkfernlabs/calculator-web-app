# Calculator Web App

A modern, full-stack calculator web application with a Node.js/Express backend and React frontend. Features a beautiful dark theme interface with real-time calculation history.

## 🚀 Live Demo

- **Frontend**: https://frontend-morphvm-upq2ibiu.http.cloud.morph.so
- **Backend API**: https://calculator-backend-morphvm-upq2ibiu.http.cloud.morph.so

## ✨ Features

- **7 Calculator Operations**:
  - Basic: Add, Subtract, Multiply, Divide
  - Advanced: Modulo, Power (x^y), Square Root
- **Real-time Calculation History**: All calculations stored in PostgreSQL and displayed with timestamps
- **Modern Dark UI**: Sleek interface inspired by iOS calculator
- **Error Handling**: Graceful handling of division by zero, negative square roots, etc.
- **Floating-point Precision**: Results automatically rounded to avoid precision issues
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- **RESTful API**: Clean backend API with full CORS support

## 📦 Tech Stack

- **Frontend**: React 18, Vite 7, Pure CSS
- **Backend**: Node.js 20, Express 5
- **Database**: Neon PostgreSQL
- **Deployment**: Morph VPS

## 🔧 Backend

The backend is built with Node.js and Express, using PostgreSQL (Neon) for data storage.

### API Endpoints

- `GET /health` - Health check
- `GET /api/operations` - List available operations
- `POST /api/calculate` - Perform calculation
  ```json
  {
    "operation": "add",
    "operand1": 5,
    "operand2": 3
  }
  ```
- `GET /api/history` - Get calculation history
- `DELETE /api/history` - Clear calculation history

### Backend URL
https://calculator-backend-morphvm-upq2ibiu.http.cloud.morph.so

### Running the Backend

```bash
cd backend
npm install
node index.js
```

Backend runs on port 3001.

## 🎨 Frontend

The frontend is built with React and Vite, featuring a modern calculator UI with history panel.

### Features
- Calculator display with operation indicator
- Number pad with all digits and decimal support
- Basic and advanced operation buttons
- Toggle sign (+/-) and percentage functions
- Collapsible history panel
- Clear history functionality
- Smooth animations and hover effects

### Frontend URL
https://frontend-morphvm-upq2ibiu.http.cloud.morph.so

### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on port 3000.

## 💾 Database

The app uses Neon PostgreSQL database to store calculation history.

**Database**: `neondb`
**Table**: `calculations`

### Schema
```sql
CREATE TABLE calculations (
  id SERIAL PRIMARY KEY,
  operation VARCHAR(20) NOT NULL,
  operand1 DECIMAL NOT NULL,
  operand2 DECIMAL,
  result DECIMAL NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📁 Project Structure

```
calculator-app/
├── backend/
│   ├── index.js           # Express server
│   ├── package.json       # Backend dependencies
│   ├── .env              # Environment variables
│   └── README.md         # Backend documentation
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Main calculator component
│   │   ├── App.css       # Calculator styles
│   │   └── main.jsx      # React entry point
│   ├── index.html        # HTML template
│   ├── vite.config.js    # Vite configuration
│   ├── package.json      # Frontend dependencies
│   └── README.md         # Frontend documentation
├── README.md             # This file
├── TODO.md              # Task tracking
└── ISSUES.md            # Issues log
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/tkfernlabs/calculator-web-app.git
   cd calculator-web-app
   ```

2. **Set up backend**
   ```bash
   cd backend
   npm install
   # Create .env file with DATABASE_URL
   node index.js
   ```

3. **Set up frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the app**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🔗 GitHub Repository

https://github.com/tkfernlabs/calculator-web-app

## 📝 Documentation

- [Backend README](./backend/README.md) - Detailed backend documentation
- [Frontend README](./frontend/README.md) - Detailed frontend documentation
- [TODO.md](./TODO.md) - Development task tracking
- [ISSUES.md](./ISSUES.md) - Known issues and resolutions

## ✅ Testing

Both backend and frontend have been thoroughly tested:
- ✅ All 7 calculator operations working
- ✅ Error handling for edge cases
- ✅ Database persistence verified
- ✅ External URL access confirmed
- ✅ CORS properly configured
- ✅ Frontend-backend integration working

## 🐛 Known Issues

See [ISSUES.md](./ISSUES.md) for the complete list. Currently 3 minor, non-blocking issues:
1. Floating-point precision (addressed in frontend)
2. No request logging (low priority for MVP)
3. No rate limiting (low priority for MVP)

## 📄 License

MIT License - Feel free to use this project for learning and development.


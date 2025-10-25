# Calculator Web App - Frontend

A modern, responsive calculator web application built with React and Vite. Features a beautiful dark theme interface with full calculation history tracking.

## 🚀 Live Demo

**Frontend URL**: https://frontend-morphvm-upq2ibiu.http.cloud.morph.so

## ✨ Features

- **Modern UI**: Clean, dark-themed calculator interface inspired by iOS calculator
- **Full Calculator Operations**: 
  - Basic operations: Addition, Subtraction, Multiplication, Division
  - Advanced operations: Modulo, Power (x^y), Square Root
  - Utility functions: Toggle sign (+/-), Percentage, Clear (AC)
- **Calculation History**: View and track all your calculations with timestamps
- **Real-time Backend Integration**: All calculations are processed by the backend API and stored in PostgreSQL database
- **Error Handling**: Graceful error messages for invalid operations (e.g., division by zero, square root of negative)
- **Floating-point Precision**: Results are automatically rounded to 10 decimal places to avoid JavaScript floating-point issues
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Button hover effects and error shake animations

## 🛠️ Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite 7
- **Styling**: Pure CSS with modern features
- **State Management**: React Hooks (useState, useEffect)
- **API Communication**: Fetch API

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

The frontend connects to the backend API at:
```javascript
const API_BASE_URL = 'https://calculator-backend-morphvm-upq2ibiu.http.cloud.morph.so';
```

To change the backend URL, update the `API_BASE_URL` constant in `src/App.jsx`.

### Vite Configuration

The app is configured to:
- Run on port 3000
- Accept connections from external hosts
- Serve on 0.0.0.0 for external accessibility

See `vite.config.js` for details.

## 🎨 UI Components

### Calculator Display
- Shows current number or result
- Displays operation indicator (e.g., "5 add")
- Error messages appear above display with shake animation

### Button Grid
- **Number buttons (0-9)**: Input digits
- **Decimal point**: Add decimal places
- **AC**: Clear all (reset calculator)
- **+/-**: Toggle positive/negative
- **%**: Convert to percentage
- **Operators (+, −, ×, ÷)**: Basic arithmetic
- **=**: Calculate result

### Advanced Operations
- **mod**: Modulo (remainder)
- **x^y**: Power (exponentiation)
- **√**: Square root

### History Panel
- Toggle visibility with "Show/Hide History" button
- Displays all calculations in reverse chronological order
- Shows operation, result, and timestamp
- Clear all history with "Clear" button

## 🧮 How It Works

1. **User Input**: User clicks number and operation buttons
2. **State Management**: React manages calculator state (display, operands, operation)
3. **API Call**: When calculation is performed, frontend sends POST request to backend
4. **Backend Processing**: Backend performs calculation and stores in database
5. **Result Display**: Frontend receives result and updates display
6. **History Update**: History is fetched and updated automatically

## 📱 Responsive Breakpoints

- **Desktop**: Full-width layout with side-by-side calculator and history
- **Tablet (≤768px)**: Stacked layout
- **Mobile (≤480px)**: Compact layout with smaller buttons and text

## 🎯 Key Features Implementation

### Floating-point Precision Fix
```javascript
const roundResult = (num) => {
  return Math.round(num * 10000000000) / 10000000000;
};
```

### Error Handling
```javascript
try {
  const result = await performCalculation(operation, operand1, inputValue);
  setDisplay(String(result));
} catch (err) {
  setError(err.message);
  setTimeout(() => setError(null), 3000);
}
```

### History Management
```javascript
const fetchHistory = async () => {
  const response = await fetch(`${API_BASE_URL}/api/history`);
  const data = await response.json();
  if (data.success) {
    setHistory(data.history);
  }
};
```

## 🐛 Known Issues

None! All frontend functionality is working as expected.

## 📄 File Structure

```
frontend/
├── index.html          # HTML entry point
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies
├── src/
│   ├── main.jsx        # React entry point
│   ├── App.jsx         # Main calculator component
│   ├── App.css         # Calculator styles
│   └── index.css       # Global styles
└── public/
    └── vite.svg        # Favicon
```

## 🚀 Deployment

The frontend is deployed and accessible at:
**https://frontend-morphvm-upq2ibiu.http.cloud.morph.so**

Development server runs on port 3000 with hot module replacement (HMR) enabled.

## 🔗 API Integration

### Endpoints Used

1. **Calculate**
   ```
   POST /api/calculate
   Body: { operation, operand1, operand2 }
   ```

2. **Get History**
   ```
   GET /api/history
   ```

3. **Clear History**
   ```
   DELETE /api/history
   ```

## 👨‍💻 Development

Start the development server:
```bash
npm run dev
```

The app will be available at:
- Local: http://localhost:3000
- Network: http://172.16.0.2:3000
- External: https://frontend-morphvm-upq2ibiu.http.cloud.morph.so

## 🎨 Styling

The app uses a modern dark theme with:
- **Background**: Purple gradient (from #667eea to #764ba2)
- **Calculator**: Dark gray (#1e1e1e)
- **Buttons**: Various shades with hover effects
- **Operator buttons**: Orange (#ff9500)
- **Function buttons**: Light gray (#a5a5a5)

All colors, spacing, and animations are defined in `App.css`.

## 📝 License

This project is part of the Calculator Web App. See the main README for more information.


const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Calculator API is running' });
});

// Calculator operations
const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  },
  modulo: (a, b) => {
    if (b === 0) {
      throw new Error('Modulo by zero');
    }
    return a % b;
  },
  power: (a, b) => Math.pow(a, b),
  sqrt: (a) => {
    if (a < 0) {
      throw new Error('Square root of negative number');
    }
    return Math.sqrt(a);
  }
};

// Calculate endpoint
app.post('/api/calculate', async (req, res) => {
  try {
    const { operation, operand1, operand2 } = req.body;

    // Validate input
    if (!operation || operand1 === undefined) {
      return res.status(400).json({ error: 'Operation and operand1 are required' });
    }

    if (!operations[operation]) {
      return res.status(400).json({ error: 'Invalid operation' });
    }

    const num1 = parseFloat(operand1);
    const num2 = operand2 !== undefined ? parseFloat(operand2) : null;

    if (isNaN(num1) || (operand2 !== undefined && isNaN(num2))) {
      return res.status(400).json({ error: 'Invalid operands' });
    }

    // Perform calculation
    let result;
    if (operation === 'sqrt') {
      result = operations[operation](num1);
    } else {
      if (num2 === null) {
        return res.status(400).json({ error: 'operand2 is required for this operation' });
      }
      result = operations[operation](num1, num2);
    }

    // Save to database
    await pool.query(
      'INSERT INTO calculations (operation, operand1, operand2, result) VALUES ($1, $2, $3, $4)',
      [operation, num1, num2, result]
    );

    res.json({
      operation,
      operand1: num1,
      operand2: num2,
      result
    });
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get calculation history
app.get('/api/history', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const result = await pool.query(
      'SELECT * FROM calculations ORDER BY created_at DESC LIMIT $1',
      [limit]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Clear history
app.delete('/api/history', async (req, res) => {
  try {
    await pool.query('DELETE FROM calculations');
    res.json({ message: 'History cleared successfully' });
  } catch (error) {
    console.error('History clear error:', error);
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

// Get available operations
app.get('/api/operations', (req, res) => {
  res.json({
    operations: Object.keys(operations),
    descriptions: {
      add: 'Add two numbers',
      subtract: 'Subtract second number from first',
      multiply: 'Multiply two numbers',
      divide: 'Divide first number by second',
      modulo: 'Get remainder of division',
      power: 'Raise first number to the power of second',
      sqrt: 'Get square root of a number (only needs operand1)'
    }
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Calculator API server is running on port ${port}`);
});


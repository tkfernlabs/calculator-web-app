# Calculator Backend API

A RESTful API for calculator operations with PostgreSQL database integration.

## Features

- Basic arithmetic operations: add, subtract, multiply, divide
- Advanced operations: modulo, power, square root
- Calculation history stored in database
- Error handling for edge cases (division by zero, etc.)

## Endpoints

### Health Check
```
GET /health
```
Returns server status.

### Calculate
```
POST /api/calculate
Content-Type: application/json

{
  "operation": "add|subtract|multiply|divide|modulo|power|sqrt",
  "operand1": number,
  "operand2": number (optional for sqrt)
}
```

### Get History
```
GET /api/history?limit=10
```
Returns recent calculation history.

### Clear History
```
DELETE /api/history
```
Clears all calculation history.

### Get Operations
```
GET /api/operations
```
Returns list of available operations with descriptions.

## External URL

The backend is exposed at:
```
https://calculator-backend-morphvm-upq2ibiu.http.cloud.morph.so
```

## Example Usage

```bash
# Add two numbers
curl -X POST https://calculator-backend-morphvm-upq2ibiu.http.cloud.morph.so/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation":"add","operand1":5,"operand2":3}'

# Get square root
curl -X POST https://calculator-backend-morphvm-upq2ibiu.http.cloud.morph.so/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation":"sqrt","operand1":16}'

# Get history
curl https://calculator-backend-morphvm-upq2ibiu.http.cloud.morph.so/api/history
```

## Database Schema

```sql
CREATE TABLE calculations (
  id SERIAL PRIMARY KEY,
  operation VARCHAR(255) NOT NULL,
  operand1 DECIMAL NOT NULL,
  operand2 DECIMAL,
  result DECIMAL NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables

- `PORT`: Server port (default: 3001)
- `DATABASE_URL`: PostgreSQL connection string

## Running Locally

```bash
npm install
npm start
```


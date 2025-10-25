#!/bin/bash

# Calculator Backend API Test Script
# Usage: ./test-api.sh

API_URL="https://calculator-backend-morphvm-upq2ibiu.http.cloud.morph.so"

echo "=========================================="
echo "Calculator Backend API Test Suite"
echo "=========================================="
echo ""

# Test 1: Health Check
echo "Test 1: Health Check"
curl -s "$API_URL/health"
echo -e "\n"

# Test 2: Get Operations
echo "Test 2: Get Available Operations"
curl -s "$API_URL/api/operations"
echo -e "\n"

# Test 3: Addition
echo "Test 3: Addition (5 + 3)"
curl -s -X POST "$API_URL/api/calculate" \
  -H "Content-Type: application/json" \
  -d '{"operation":"add","operand1":5,"operand2":3}'
echo -e "\n"

# Test 4: Subtraction
echo "Test 4: Subtraction (10 - 4)"
curl -s -X POST "$API_URL/api/calculate" \
  -H "Content-Type: application/json" \
  -d '{"operation":"subtract","operand1":10,"operand2":4}'
echo -e "\n"

# Test 5: Multiplication
echo "Test 5: Multiplication (6 × 7)"
curl -s -X POST "$API_URL/api/calculate" \
  -H "Content-Type: application/json" \
  -d '{"operation":"multiply","operand1":6,"operand2":7}'
echo -e "\n"

# Test 6: Division
echo "Test 6: Division (20 ÷ 4)"
curl -s -X POST "$API_URL/api/calculate" \
  -H "Content-Type: application/json" \
  -d '{"operation":"divide","operand1":20,"operand2":4}'
echo -e "\n"

# Test 7: Division by Zero
echo "Test 7: Division by Zero (should fail gracefully)"
curl -s -X POST "$API_URL/api/calculate" \
  -H "Content-Type: application/json" \
  -d '{"operation":"divide","operand1":10,"operand2":0}'
echo -e "\n"

# Test 8: Square Root
echo "Test 8: Square Root (√16)"
curl -s -X POST "$API_URL/api/calculate" \
  -H "Content-Type: application/json" \
  -d '{"operation":"sqrt","operand1":16}'
echo -e "\n"

# Test 9: Power
echo "Test 9: Power (2^10)"
curl -s -X POST "$API_URL/api/calculate" \
  -H "Content-Type: application/json" \
  -d '{"operation":"power","operand1":2,"operand2":10}'
echo -e "\n"

# Test 10: Get History
echo "Test 10: Get Calculation History (last 5)"
curl -s "$API_URL/api/history?limit=5"
echo -e "\n"

echo "=========================================="
echo "Test Suite Completed"
echo "=========================================="


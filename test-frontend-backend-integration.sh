#!/bin/bash

# Frontend-Backend Integration Test Script
# Tests the complete flow from frontend API calls to backend responses

echo "=========================================="
echo "Frontend-Backend Integration Tests"
echo "=========================================="
echo ""

BACKEND_URL="https://calculator-backend-morphvm-upq2ibiu.http.cloud.morph.so"
FRONTEND_URL="https://frontend-morphvm-upq2ibiu.http.cloud.morph.so"

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

passed=0
failed=0

test_count=0

# Function to run a test
run_test() {
    local test_name="$1"
    local endpoint="$2"
    local method="$3"
    local data="$4"
    local expected_pattern="$5"
    
    test_count=$((test_count + 1))
    echo "Test $test_count: $test_name"
    
    if [ "$method" = "POST" ]; then
        response=$(curl -s -X POST "$BACKEND_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    elif [ "$method" = "DELETE" ]; then
        response=$(curl -s -X DELETE "$BACKEND_URL$endpoint")
    else
        response=$(curl -s "$BACKEND_URL$endpoint")
    fi
    
    if echo "$response" | grep -q "$expected_pattern"; then
        echo -e "${GREEN}✓ PASS${NC}: $test_name"
        echo "   Response: $response"
        passed=$((passed + 1))
    else
        echo -e "${RED}✗ FAIL${NC}: $test_name"
        echo "   Expected pattern: $expected_pattern"
        echo "   Got: $response"
        failed=$((failed + 1))
    fi
    echo ""
}

# Test frontend accessibility
echo "=== Testing Frontend Accessibility ==="
echo ""

test_count=$((test_count + 1))
echo "Test $test_count: Frontend is accessible"
frontend_response=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL")
if [ "$frontend_response" = "200" ]; then
    echo -e "${GREEN}✓ PASS${NC}: Frontend is accessible (HTTP $frontend_response)"
    passed=$((passed + 1))
else
    echo -e "${RED}✗ FAIL${NC}: Frontend returned HTTP $frontend_response"
    failed=$((failed + 1))
fi
echo ""

test_count=$((test_count + 1))
echo "Test $test_count: Frontend contains Calculator title"
if curl -s "$FRONTEND_URL" | grep -q "Calculator Web App"; then
    echo -e "${GREEN}✓ PASS${NC}: Frontend contains correct title"
    passed=$((passed + 1))
else
    echo -e "${RED}✗ FAIL${NC}: Frontend title not found"
    failed=$((failed + 1))
fi
echo ""

# Test backend accessibility
echo "=== Testing Backend API Accessibility ==="
echo ""

run_test "Backend health check" "/health" "GET" "" '"status":"ok"'
run_test "List available operations" "/api/operations" "GET" "" '"operations"'

# Test all calculator operations
echo "=== Testing Calculator Operations ==="
echo ""

run_test "Addition: 15 + 7" "/api/calculate" "POST" '{"operation":"add","operand1":15,"operand2":7}' '"result":22'
run_test "Subtraction: 20 - 8" "/api/calculate" "POST" '{"operation":"subtract","operand1":20,"operand2":8}' '"result":12'
run_test "Multiplication: 9 × 8" "/api/calculate" "POST" '{"operation":"multiply","operand1":9,"operand2":8}' '"result":72'
run_test "Division: 100 ÷ 5" "/api/calculate" "POST" '{"operation":"divide","operand1":100,"operand2":5}' '"result":20'
run_test "Modulo: 17 % 5" "/api/calculate" "POST" '{"operation":"modulo","operand1":17,"operand2":5}' '"result":2'
run_test "Power: 2^8" "/api/calculate" "POST" '{"operation":"power","operand1":2,"operand2":8}' '"result":256'
run_test "Square Root: √64" "/api/calculate" "POST" '{"operation":"sqrt","operand1":64,"operand2":0}' '"result":8'

# Test error handling
echo "=== Testing Error Handling ==="
echo ""

run_test "Division by zero" "/api/calculate" "POST" '{"operation":"divide","operand1":10,"operand2":0}' '"error"'
run_test "Square root of negative" "/api/calculate" "POST" '{"operation":"sqrt","operand1":-4,"operand2":0}' '"error"'
run_test "Invalid operation" "/api/calculate" "POST" '{"operation":"invalid","operand1":5,"operand2":3}' '"error"'

# Test history functionality
echo "=== Testing History Functionality ==="
echo ""

run_test "Get calculation history" "/api/history" "GET" "" '"operation"'

# Final summary
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo -e "Total Tests: $test_count"
echo -e "${GREEN}Passed: $passed${NC}"
echo -e "${RED}Failed: $failed${NC}"
echo ""

if [ $failed -eq 0 ]; then
    echo -e "${GREEN}All tests passed! ✓${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed! ✗${NC}"
    exit 1
fi


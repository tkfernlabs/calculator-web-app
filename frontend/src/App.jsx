import { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'https://calculator-backend-morphvm-upq2ibiu.http.cloud.morph.so';

function App() {
  const [display, setDisplay] = useState('0');
  const [operand1, setOperand1] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  // Fetch history on mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/history`);
      const data = await response.json();
      // Backend returns array directly
      if (Array.isArray(data)) {
        setHistory(data);
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const roundResult = (num) => {
    // Round to 10 decimal places to avoid floating point precision issues
    return Math.round(num * 10000000000) / 10000000000;
  };

  // Map operation names to mathematical symbols
  const getOperationSymbol = (op) => {
    const symbols = {
      'add': '+',
      'subtract': '−',
      'multiply': '×',
      'divide': '÷',
      'modulo': 'mod',
      'power': '^',
      'sqrt': '√'
    };
    return symbols[op] || op;
  };

  const performCalculation = async (op, val1, val2) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operation: op,
          operand1: val1,
          operand2: val2,
        }),
      });

      const data = await response.json();
      
      // Check if response contains error
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Backend returns {operation, operand1, operand2, result}
      if (data.result !== undefined) {
        const roundedResult = roundResult(data.result);
        fetchHistory(); // Refresh history
        return roundedResult;
      } else {
        throw new Error('Calculation failed');
      }
    } catch (err) {
      setError(err.message);
      // Increased timeout from 3s to 6s for better visibility
      setTimeout(() => setError(null), 6000);
      throw err;
    }
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setOperand1(null);
    setOperation(null);
    setWaitingForOperand(false);
    setError(null);
  };

  const toggleSign = () => {
    const newValue = parseFloat(display) * -1;
    setDisplay(String(newValue));
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const performOperation = async (nextOperation) => {
    const inputValue = parseFloat(display);

    if (operand1 === null) {
      setOperand1(inputValue);
    } else if (operation) {
      try {
        const result = await performCalculation(operation, operand1, inputValue);
        setDisplay(String(result));
        setOperand1(result);
      } catch (err) {
        // Error already handled in performCalculation
        return;
      }
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performSquareRoot = async () => {
    const inputValue = parseFloat(display);
    try {
      const result = await performCalculation('sqrt', inputValue, 0);
      setDisplay(String(result));
      setOperand1(null);
      setOperation(null);
      setWaitingForOperand(true);
    } catch (err) {
      // Error already handled
    }
  };

  const clearHistory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/history`, {
        method: 'DELETE',
      });
      const data = await response.json();
      // Backend returns {message: ...} on success
      if (data.message || response.ok) {
        setHistory([]);
      }
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
  };

  const handleEquals = async () => {
    const inputValue = parseFloat(display);

    if (operation && operand1 !== null) {
      try {
        const result = await performCalculation(operation, operand1, inputValue);
        setDisplay(String(result));
        setOperand1(null);
        setOperation(null);
        setWaitingForOperand(true);
      } catch (err) {
        // Error already handled
      }
    }
  };

  return (
    <div className="calculator-app">
      <div className="calculator-container">
        <div className="calculator">
          <div className="display-section">
            {error && <div className="error-message">{error}</div>}
            <div className="display">{display}</div>
            {operation && <div className="operation-indicator">{operand1} {getOperationSymbol(operation)}</div>}
          </div>
          
          <div className="button-grid">
            <button className="btn btn-function" onClick={clear}>AC</button>
            <button className="btn btn-function" onClick={toggleSign}>+/-</button>
            <button className="btn btn-function" onClick={inputPercent}>%</button>
            <button className="btn btn-operator" onClick={() => performOperation('divide')}>÷</button>
            
            <button className="btn" onClick={() => inputDigit(7)}>7</button>
            <button className="btn" onClick={() => inputDigit(8)}>8</button>
            <button className="btn" onClick={() => inputDigit(9)}>9</button>
            <button className="btn btn-operator" onClick={() => performOperation('multiply')}>×</button>
            
            <button className="btn" onClick={() => inputDigit(4)}>4</button>
            <button className="btn" onClick={() => inputDigit(5)}>5</button>
            <button className="btn" onClick={() => inputDigit(6)}>6</button>
            <button className="btn btn-operator" onClick={() => performOperation('subtract')}>−</button>
            
            <button className="btn" onClick={() => inputDigit(1)}>1</button>
            <button className="btn" onClick={() => inputDigit(2)}>2</button>
            <button className="btn" onClick={() => inputDigit(3)}>3</button>
            <button className="btn btn-operator" onClick={() => performOperation('add')}>+</button>
            
            <button className="btn btn-zero" onClick={() => inputDigit(0)}>0</button>
            <button className="btn" onClick={inputDecimal}>.</button>
            <button className="btn btn-equals" onClick={handleEquals}>=</button>
          </div>

          <div className="advanced-operations">
            <button className="btn btn-function" onClick={() => performOperation('modulo')}>mod</button>
            <button className="btn btn-function" onClick={() => performOperation('power')}>x^y</button>
            <button className="btn btn-function" onClick={performSquareRoot}>√</button>
          </div>

          <div className="history-toggle">
            <button 
              className="btn btn-history" 
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
          </div>
        </div>

        {showHistory && (
          <div className="history-panel">
            <div className="history-header">
              <h3>Calculation History</h3>
              <button className="btn-clear-history" onClick={clearHistory}>Clear</button>
            </div>
            <div className="history-list">
              {history.length === 0 ? (
                <p className="no-history">No calculations yet</p>
              ) : (
                history.map((item, index) => (
                  <div key={index} className="history-item">
                    <span className="history-operation">
                      {item.operand1} {getOperationSymbol(item.operation)} {item.operand2 !== null ? item.operand2 : ''}
                    </span>
                    <span className="history-result">= {roundResult(item.result)}</span>
                    <span className="history-time">
                      {new Date(item.created_at).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '=') {
      try {
        // eslint-disable-next-line no-eval
        const result = eval(input); // Evaluate the expression
        setHistory([...history, `${input} = ${result}`]);
        setInput(result.toString());
      } catch {
        setInput('Error');
      }
    } else {
      setInput(input + value);
    }
  };

  const handleHistoryClear = () => {
    setHistory([]);
  };

  const Button = () => {
    const handleCopy = () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(input)
          .then(() => {
            // alert('Copied to clipboard!');
          })
          .catch((err) => {
            console.error('Clipboard write failed:', err);
            alert('Failed to copy. Please try again.');
          });
      } else {
        // Fallback for unsupported environments
        const textArea = document.createElement('textarea');
        textArea.value = input;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            // alert('Copied to clipboard!');
          } else {
            alert('Failed to copy. Please try again.');
          }
        } catch (err) {
          console.error('Fallback copy failed:', err);
          alert('Failed to copy. Please try again.');
        }
        document.body.removeChild(textArea);
      }
    };


    return (
      <button className="copy" onClick={handleCopy} style={{ position: 'absolute', left: '10px', bottom: '7px' }}>
        <span data-text-end="Copied!" data-text-initial="Copy to clipboard" className="tooltip" />
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24">
            <g fill="none">
              <path fill="#ffffff" fill-opacity="0.16" d="M18.6 9h-7.2A2.4 2.4 0 0 0 9 11.4v7.2a2.4 2.4 0 0 0 2.4 2.4h7.2a2.4 2.4 0 0 0 2.4-2.4v-7.2A2.4 2.4 0 0 0 18.6 9" />
              <path stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M6 15h-.6C4.07 15 3 13.93 3 12.6V5.4C3 4.07 4.07 3 5.4 3h7.2C13.93 3 15 4.07 15 5.4V6m-3.6 3h7.2a2.4 2.4 0 0 1 2.4 2.4v7.2a2.4 2.4 0 0 1-2.4 2.4h-7.2A2.4 2.4 0 0 1 9 18.6v-7.2A2.4 2.4 0 0 1 11.4 9" />
            </g>
          </svg>
        </span>
      </button>
    );
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">
          <Button />
          {input || '0'}
        </div>
        <div className="buttons">
          {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'].map((btn) => (
            <button key={btn} onClick={() => handleButtonClick(btn)}>
              {btn}
            </button>
          ))}
        </div>
      </div>
      <div className="history">
        <h3 class="history-heading">
          History
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24">
            <g fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
              <path d="m8 9l3 3l-3 3m5 0h3" />
              <path d="M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6z" />
            </g>
          </svg>
        </h3>

        <ul>
          {history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
        {history.length > 0 && (
          <button className="clear-history" onClick={handleHistoryClear}>
            Clear History
          </button>
        )}
      </div>
    </div>
  );
};

export default Calculator;

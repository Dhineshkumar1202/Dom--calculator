document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.textContent = '0';
            } else if (value === '&larr;') {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
            } else if (value === '=') {
                if (currentInput && previousInput && operator) {
                    try {
                        currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
                        display.textContent = currentInput;
                        previousInput = '';
                        operator = '';
                    } catch {
                        display.textContent = 'Error';
                        currentInput = '';
                    }
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    previousInput = currentInput;
                    currentInput = '';
                    operator = value;
                }
            } else {
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (/[0-9/*\-+.]/.test(e.key)) {
            if (e.key === 'Enter') {
                e.preventDefault();
                document.querySelector('button.btn-primary').click();
            } else if (e.key === 'Backspace') {
                document.querySelector('button:contains("&larr;")').click();
            } else {
                currentInput += e.key;
                display.textContent = currentInput;
            }
        } else {
            alert('Only numbers are allowed');
            e.preventDefault();
        }
    });
});

class Calculator {
    constructor() {
        this.currentDisplay = document.getElementById('current-display');
        this.previousOperation = document.getElementById('previous-operation');
        this.clear();
        this.bindEvents();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.waitingForOperand = false;
        this.updateDisplay();
    }

    appendNumber(number) {
        if (this.waitingForOperand) {
            this.currentOperand = number;
            this.waitingForOperand = false;
        } else {
            if (this.currentOperand === '0') {
                this.currentOperand = number;
            } else {
                this.currentOperand += number;
            }
        }
        this.updateDisplay();
    }

    appendDecimal() {
        if (this.waitingForOperand) {
            this.currentOperand = '0.';
            this.waitingForOperand = false;
        } else if (this.currentOperand.indexOf('.') === -1) {
            this.currentOperand += '.';
        }
        this.updateDisplay();
    }

    backspace() {
        if (this.currentOperand.length > 1) {
            this.currentOperand = this.currentOperand.slice(0, -1);
        } else {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    chooseOperation(nextOperation) {
        if (this.currentOperand === '') return;

        if (this.previousOperand !== '' && !this.waitingForOperand) {
            this.compute();
        }

        this.operation = nextOperation;
        this.previousOperand = this.currentOperand;
        this.waitingForOperand = true;
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert("Cannot divide by zero!");
                    return;
                }
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        // Round to avoid floating point precision issues
        computation = Math.round((computation + Number.EPSILON) * 100000000) / 100000000;
        
        this.currentOperand = computation.toString();
        this.operation = null;
        this.previousOperand = '';
        this.waitingForOperand = true;
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentDisplay.textContent = this.formatNumber(this.currentOperand);
        
        if (this.operation != null) {
            let operatorSymbol = this.operation;
            if (this.operation === '*') operatorSymbol = '×';
            if (this.operation === '/') operatorSymbol = '÷';
            
            this.previousOperation.textContent = 
                `${this.formatNumber(this.previousOperand)} ${operatorSymbol}`;
        } else {
            this.previousOperation.textContent = '';
        }
    }

    formatNumber(number) {
        if (number === '') return '';
        
        const parts = number.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        // Limit decimal places to prevent overflow
        if (parts[1] && parts[1].length > 8) {
            parts[1] = parts[1].substring(0, 8);
        }
        
        return parts.join('.');
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.grid-item')) return;

            const button = e.target.closest('.grid-item');
            
            // Visual feedback
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);

            // Handle different button types
            if (button.dataset.number) {
                this.appendNumber(button.dataset.number);
            }

            if (button.dataset.operator) {
                this.chooseOperation(button.dataset.operator);
            }

            if (button.dataset.action) {
                switch (button.dataset.action) {
                    case 'clear':
                        this.clear();
                        break;
                    case 'backspace':
                        this.backspace();
                        break;
                    case 'decimal':
                        this.appendDecimal();
                        break;
                    case 'equals':
                        this.compute();
                        break;
                    case 'double-zero':
                        this.appendNumber('00');
                        break;
                }
            }
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                this.appendNumber(e.key);
            }
            
            switch (e.key) {
                case '.':
                    this.appendDecimal();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.chooseOperation(e.key);
                    break;
                case 'Enter':
                case '=':
                    e.preventDefault();
                    this.compute();
                    break;
                case 'Escape':
                case 'c':
                case 'C':
                    this.clear();
                    break;
                case 'Backspace':
                    e.preventDefault();
                    this.backspace();
                    break;
            }
        });
    }
}

// Initialise calculator when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
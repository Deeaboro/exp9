class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear(); // Initialize the calculator state
    }

    /** Clears all variables and resets the display. */
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    /** Removes the last digit from the current operand. */
    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }

    /** Appends a number to the current operand, handling decimal points. */
    appendNumber(number) {
        // Prevent multiple decimal points
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        // Overwrite '0' if a number is pressed, otherwise append
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    /** Sets the operation and prepares the next number entry. */
    chooseOperation(operation) {
        // Do nothing if current operand is empty
        if (this.currentOperand === '0' && this.previousOperand === '') return;
        
        // If there is a previous operation, calculate it first
        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    /** Performs the actual arithmetic calculation. */
    compute() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        // Check if either operand is not a number
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert("Error: Division by zero!");
                    this.clear();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = result.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    /** Updates the display elements with the current state of the calculator. */
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// --- DOM Element Selection and Event Listeners ---

// Select all buttons using their data attributes
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Create a new Calculator instance
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Event listener for Number Buttons (0-9, .)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

// Event listener for Operation Buttons (+, -, *, /)
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// Event listener for Equals Button (=)
equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

// Event listener for AC Button (All Clear)
allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

// Event listener for DEL Button (Delete/Backspace)
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// Initialize display
calculator.updateDisplay();
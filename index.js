const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const acButton = document.querySelector('[data-all-clear]');
const powerButton = document.querySelector('[data-power]')
const currentTextOnScreen = document.querySelector('[data-operand-current]');
const previousTextOnScreen = document.querySelector('[data-operand-previous]');


class Calculator {
    constructor(currentTextOnScreen, previousTextOnScreen){
        this.currentTextOnScreen = currentTextOnScreen;
        this.previousTextOnScreen = previousTextOnScreen;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = "";
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.'))
        return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        /// เพื่อให้ไม่สามารถกดจุดหลายครั้งได้ และนำตัวเลขมาต่อหลังจุดได้
    }

    powerconvert(powerButton) {
        this.flushOperator("**");
    }
      

    flushOperator(operation) {
        if (this.currentOperand === "") 
        return
        else if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";

    }

   

    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        /// parseFloat คือแปลง object ให้เป็น float
        if(isNaN(previous) || isNaN(current))
        return;

        switch(this.operation) { /// "switch" = "if" , but for many cases
            case "+":
                computation = previous + current;
                break;
            case "–":
                computation = previous - current;
                break;    
            case "×":
                computation = previous * current;
                 break;        
            case "÷":
                computation = previous / current;
                break;
            case "**":
                computation = previous ** current;
                break;
                   
             default: return;
        }

        this.currentOperand = computation;
        this.previousOperand = "";
        this.operation = "";

    }

    power(xy) {
        
    }

    updatedDisplay() {
        this.currentTextOnScreen.innerText = this.currentOperand;
        if(this.operation != null) {
            this.previousTextOnScreen.innerText = `${this.previousOperand} ${this.operation}`;
        }
    }
}

const calculator = new Calculator(
    currentTextOnScreen, 
    previousTextOnScreen
);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updatedDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.flushOperator(button.innerText);
        calculator.updatedDisplay();
        
    });
});

equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updatedDisplay();
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updatedDisplay();
});

acButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updatedDisplay();
});

powerButton.addEventListener('click', () => {
    calculator.powerconvert();
    
    calculator.updatedDisplay();

});

class Calculator {
  constructor() {
    this.runningTotal = 0;
    this.buffer = "0";
    this.previousOperator = null;
    this.prevNum = 0;
    this.equalsPressed = false;
    this.screen = document.querySelector(".screen");
    
    this.init();
  }

  init() {
    document.querySelector('.calc-buttons').addEventListener('click', (event) => {
      this.handleInput(event.target.innerText);
    });
  }

  handleInput(value) {
    isNaN(value) ? this.handleSymbol(value) : this.handleNumber(value);
    this.updateScreen();
  }

  handleSymbol(symbol) {
    const symbolHandlers = {
      'AC': () => this.reset(),
      '=': () => this.handleEquals(),
      '←': () => this.handleBackspace(),
      default: () => this.handleOperator(symbol)
    };

    (symbolHandlers[symbol] || symbolHandlers.default)();
  }

  handleNumber(numberString) {
    if (this.equalsPressed) this.reset();
    this.buffer = this.buffer === "0" ? numberString : this.buffer + numberString;
  }

  handleEquals() {
    if (this.equalsPressed) {
      this.flushOperation(this.prevNum);
    } else {
      this.equalsPressed = true;
      this.prevNum = parseInt(this.buffer);
      this.flushOperation(parseInt(this.buffer));
    }
    this.buffer = this.runningTotal.toString();
  }

  handleBackspace() {
    if (this.equalsPressed) {
      this.runningTotal = 0;
      this.previousOperator = null;
      this.equalsPressed = false;
    }
    this.buffer = this.buffer.length === 1 ? "0" : this.buffer.slice(0, -1);
  }

  handleOperator(symbol) {
    const currentValue = parseInt(this.buffer);
    
    if (this.previousOperator === null) {
      this.runningTotal = currentValue;
    } else if (!this.equalsPressed) {
      this.flushOperation(currentValue);
    }
    
    this.previousOperator = symbol;
    this.buffer = "0";
    this.equalsPressed = false;
  }

  flushOperation(intBuffer) {
    const operations = {
      '+': (a, b) => a + b,
      '−': (a, b) => a - b,
      '×': (a, b) => a * b,
      '÷': (a, b) => a / b
    };

    if (this.previousOperator && operations[this.previousOperator]) {
      this.runningTotal = operations[this.previousOperator](this.runningTotal, intBuffer);
    }
  }

  reset() {
    this.buffer = "0";
    this.runningTotal = 0;
    this.previousOperator = null;
    this.prevNum = 0;
    this.equalsPressed = false;
  }

  updateScreen() {
    this.screen.innerText = this.buffer;
  }
}

new Calculator();
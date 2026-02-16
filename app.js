let firstOperand = null;
let secondOperand = null;
let operator = null;
let error = false;
let justEvaluated = false;

const display = document.querySelector("#display");

const numberBtns = Array.from(document.querySelectorAll("button")).filter((b) =>
  Number.isInteger(Number(b.id)),
);

const operatorBtns = Array.from(document.querySelectorAll("button")).filter(
  (b) =>
    b.id === "add" ||
    b.id === "subtract" ||
    b.id === "multiply" ||
    b.id === "divide",
);

const equalBtn = document.querySelector("#equal");
const clearBtn = document.querySelector("#clear");

function clear() {
  firstOperand = secondOperand = operator = null;
}

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

function evaluate(a, b, operator) {
  if (a === null || b === null || operator === null) return null;
  if (b === 0 && operator === "divide") return null;
  if (!operations[operator]) return null;

  return operations[operator](a, b);
}

function updateNumber(operand, btn) {
  const input = Number(btn.id);
  if (operand === null) {
    return input;
  } else {
    return operand * 10 + input;
  }
}

function handleNumberPress(btn) {
  if (error) return;
  if (justEvaluated) {
    clear();
    justEvaluated = false;
  }

  if (operator === null) {
    firstOperand = updateNumber(firstOperand, btn);
  } else {
    secondOperand = updateNumber(secondOperand, btn);
  }
  updateDisplay();
}

function handleOperatorPress(btn) {
  if (error) return;
  if (firstOperand === null) return;
  if (firstOperand !== null && operator === null) {
    operator = btn.id;
    return;
  }

  if (firstOperand !== null && operator !== null && secondOperand !== null) {
    const result = evaluate(firstOperand, secondOperand, operator);
    if (result === null) {
      error = true;
    } else {
      firstOperand = result;
      operator = btn.id;
      secondOperand = null;
    }
    //When different operators are pressed continuously, use the last one
  } else if (
    firstOperand !== null &&
    operator !== null &&
    secondOperand === null
  ) {
    operator = btn.id;
  } else {
    error = true;
  }
  updateDisplay();
}

function handleEqualBtnPress() {
  if (error) return;
  if (firstOperand !== null && operator !== null && secondOperand !== null) {
    const result = evaluate(firstOperand, secondOperand, operator);
    if (result === null) {
      error = true;
    } else {
      firstOperand = result;
      operator = null;
      secondOperand = null;
      justEvaluated = true;
    }
  } else {
    error = true;
  }
  updateDisplay();
}

function updateDisplay() {
  if (error) {
    display.value = "ERROR";
  } else if (secondOperand !== null) {
    display.value = secondOperand;
  } else if (firstOperand !== null) {
    display.value = firstOperand;
  } else {
    display.value = "";
  }
}

numberBtns.forEach((b) => {
  b.addEventListener("click", () => handleNumberPress(b));
});

operatorBtns.forEach((b) => {
  b.addEventListener("click", () => handleOperatorPress(b));
});

clearBtn.addEventListener("click", () => {
  error = false;
  clear();
  updateDisplay();
});

equalBtn.addEventListener("click", handleEqualBtnPress);

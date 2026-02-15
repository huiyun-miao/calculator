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

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function evaluate(num1, num2, operator) {
  if (
    num1 === null ||
    num2 === null ||
    operator === null ||
    (num2 === 0 && operator === "divide")
  ) {
    return null;
  }
  switch (operator) {
    case "add":
      return add(num1, num2);
    case "subtract":
      return subtract(num1, num2);
    case "multiply":
      return multiply(num1, num2);
    case "divide":
      return divide(num1, num2);
  }
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

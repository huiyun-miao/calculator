let currentValue = null;
let previousValue = null;
let selectedOperator = null;
let evaluateResult = false;

const display = document.querySelector("#display");

const numberBtns = Array.from(document.querySelectorAll("button")).filter((b) =>
  Number.isInteger(Number(b.id)),
);

const operatorBtns = Array.from(document.querySelectorAll("button")).filter(
  (b) => !Number.isInteger(Number(b.id)),
);

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

function operate(num1, num2, operator) {
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

function handleNumberPress(btn) {
  const input = Number(btn.id);
  if (currentValue === null) {
    currentValue = input;
  } else {
    currentValue = currentValue * 10 + input;
  }
  updateDisplay();
}

function handleOperatorPress(btn) {
  if (selectedOperator !== null) {
    evaluateResult = true;
    updateDisplay();
    evaluateResult = false;
  } else {
    previousValue = currentValue;
    currentValue = null;
  }
  selectedOperator = btn.id;
}

// TODO: the logic for updating display and handling evaluation needs to be updated
function updateDisplay() {
  if (evaluateResult) {
    previousValue = operate(previousValue, currentValue, selectedOperator);
    currentValue = null;
    display.value = previousValue;
  } else {
    if (currentValue !== null) {
      display.value = currentValue;
    } else if (previousValue === null && currentValue === null) {
      display.value = "";
    } else {
      display.value = previousValue;
    }
  }
}

numberBtns.forEach((b) => {
  b.addEventListener("click", () => handleNumberPress(b));
});

operatorBtns.forEach((b) => {
  b.addEventListener("click", () => handleOperatorPress(b));
});

let currentValue = null;
let previousValue = null;
let selectedOperator = null;
let evaluateResult = false;
let equalPressed = false;
const SYNTAX_ERROR_MESSAGE = "SYNTAX ERROR, please press C";

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
  currentValue = previousValue = selectedOperator = null;
  evaluateResult = equalPressed = false;
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
  if (b === 0) {
    return SYNTAX_ERROR_MESSAGE;
  }
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
  if (display.value === SYNTAX_ERROR_MESSAGE) return;
  if (equalPressed) {
    clear();
  }
  const input = Number(btn.id);
  if (currentValue === null) {
    currentValue = input;
  } else {
    currentValue = currentValue * 10 + input;
  }
  display.value = updateDisplay();
}

function handleOperatorPress(btn) {
  // if (btn.id === "equal") {
  //   evaluateResult = true;
  //   display.value = updateDisplay();
  //   selectedOperator = btn.id;
  //   return;
  // }

  if (display.value === SYNTAX_ERROR_MESSAGE) return;

  //No operator is selected, update operator
  if (selectedOperator === null) {
    previousValue = currentValue;
    currentValue = null;
    selectedOperator = btn.id;
    return;
  }

  //Result from previous numbers and operator need to be evaluated
  if (selectedOperator !== null && currentValue !== null) {
    evaluateResult = true;
    display.value = updateDisplay();
    //If there is syntax error in the evaluation, clear the result, return without updating the operator
    if (display.value === "SYNTAX ERROR") {
      return;
    }
  }

  //Update selectedOperator with the selected button
  selectedOperator = btn.id;
}

// TODO: the logic for updating display and handling evaluation needs to be updated
function updateDisplay() {
  if (evaluateResult) {
    //currentValue and previousValue are not null
    previousValue = operate(previousValue, currentValue, selectedOperator);
    currentValue = null;
    evaluateResult = false;
    return previousValue;
  } else {
    if (currentValue !== null) {
      return currentValue;
    } else if (previousValue === null && currentValue === null) {
      return "";
    } else {
      return previousValue;
    }
  }
}

numberBtns.forEach((b) => {
  b.addEventListener("click", () => handleNumberPress(b));
});

operatorBtns.forEach((b) => {
  b.addEventListener("click", () => handleOperatorPress(b));
});

clearBtn.addEventListener("click", () => {
  clear();
  display.value = "";
});

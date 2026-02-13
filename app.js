//TO-DO: round the result
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
    case "+":
      add(num1, num2);
    case "−":
      subtract(num1, num2);
    case "×":
      multiply(num1, num2);
    case "÷":
      divide(num1, num2);
  }
}

let num1, num2, operator;
const display = document.querySelector("#display");

const numberBtns = Array.from(document.querySelectorAll("button")).filter((b) =>
  Number.isInteger(Number(b.id)),
);

const operatorBtns = Array.from(document.querySelectorAll("button")).filter(
  (b) => !Number.isInteger(Number(b.id)),
);

const addBtn = document.querySelector("#add");
const subtractBtn = document.querySelector("#subtract");
const multiplyBtn = document.querySelector("#multiply");
const divideBtn = document.querySelector("#divide");
const equalBtn = document.querySelector("#equal");

numberBtns.forEach((b) => {
  b.addEventListener("click", () => {
    if (operator === undefined) {
      num1 = updateInput(num1, Number(b.id));
      display.value = num1;
    } else {
      num2 = updateInput(num2, Number(b.id));
      display.value = `${num1}${operator}${num2}`;
    }
  });
});

addBtn.addEventListener("click", () => {
  if (!operator) {
    operator = "+";
    display.value += operator;
  } else {
    display.value = `${add(num1, num2)}+`;
    num1 = add(num1, num2);
    num2 = undefined;
  }
});

function updateInput(number, input) {
  if (number === undefined) return input;
  return number * 10 + input;
}

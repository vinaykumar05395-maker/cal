const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value)) {
      handleNumber(value);
    } else if (value === "C") {
      clearCalculator();
    } else if (value === "=") {
      calculateResult();
    } else {
      handleOperator(value);
    }
  });
});

function handleNumber(number) {
  if (display.textContent === "0" || waitingForSecondNumber) {
    display.textContent = number;
    waitingForSecondNumber = false;
  } else {
    display.textContent += number;
  }
}

function handleOperator(op) {
  if (firstNumber === null) {
    firstNumber = parseFloat(display.textContent);
  } else if (!waitingForSecondNumber) {
    calculateResult();
  }

  operator = op;
  waitingForSecondNumber = true;
}

function calculateResult() {
  if (operator === null || waitingForSecondNumber) return;

  const secondNumber = parseFloat(display.textContent);
  let result;

  switch (operator) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "−":
      result = firstNumber - secondNumber;
      break;
    case "×":
      result = firstNumber * secondNumber;
      break;
    case "÷":
      if (secondNumber === 0) {
        display.textContent = "Error";
        firstNumber = null;
        operator = null;
        return;
      }
      result = firstNumber / secondNumber;
      break;
    default:
      return;
  }

  display.textContent = result;
  firstNumber = result;
  operator = null;
}

function clearCalculator() {
  display.textContent = "0";
  firstNumber = null;
  operator = null;
  waitingForSecondNumber = false;
}
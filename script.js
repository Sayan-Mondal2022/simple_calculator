let inputDisplay = document.querySelector(".inp-op");
let operDisplay = document.querySelector(".oper");
const buttons = document.querySelectorAll(".inp-btn");
const idMap = {};

buttons.forEach((btn) => {
  if (btn.id) {
    idMap[btn.id] = btn;

    btn.addEventListener("click", () => {
      console.log(`Button clicked: ${btn.id}`);

      switch (btn.id) {
        case "clear":
          operDisplay.textContent = "AC";
          clearAll();
          break;
        case "cancel":
          operDisplay.textContent = "CE";
          clearOper();
          inputDisplay.textContent = inputDisplay.textContent.slice(0, -1);
          break;
        case "per":
          operDisplay.textContent = "%";
          inputDisplay.textContent = parseFloat(inputDisplay.textContent) / 100;
          clearOper();
          break;
        case "res":
          try {
            inputDisplay.textContent = eval(
              inputDisplay.textContent.replace(/x/g, "*").replace(/÷/g, "/")
            );
            operDisplay.textContent = "=";
            clearOper();
          } catch {
            inputDisplay.textContent = "Error";
          }
          break;
        default:
          if (["mul", "sub", "div", "add"].includes(btn.id)) {
            switch (btn.id) {
              case "add":
                operDisplay.textContent = "+";
                break;
              case "sub":
                operDisplay.textContent = "-";
                break;
              case "mul":
                operDisplay.textContent = "x";
                break;
              default:
                operDisplay.textContent = "÷";
            }
          }
          inputDisplay.textContent += btn.textContent;
      }
      checkAndCleanErrors();
    });
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  console.log("Key Pressed is: "+event.key);
  

  if (!isNaN(key) || key === ".") {
    // Number or decimal
    inputDisplay.textContent += key;
  } else if (["+", "-", "*", "/"].includes(key)) {
    // Operator mapping
    inputDisplay.textContent += key === "*" ? "x" : key === "/" ? "÷" : key;
    if (key === "/") {
      operDisplay.textContent = "÷";
    } else if (key === "*") {
      operDisplay.textContent = "x";
    } else operDisplay.textContent = key;
  } else if (key === "%") {
    inputDisplay.textContent = parseFloat(inputDisplay.textContent) / 100;
    operDisplay.textContent = key;
  } else if (key === "Delete") {
    operDisplay.textContent = "AC";
    clearAll();
  } else if (key === "Enter" || key === "=") {
    try {
      inputDisplay.textContent = eval(
        inputDisplay.textContent.replace(/x/g, "*").replace(/÷/g, "/")
      );
      operDisplay.textContent = "=";

      //  Clearing the Operators section after showing the Result.
      clearOper();
    } catch {
      inputDisplay.textContent = "Error";
    }
  } else if (key === "Backspace") {
    operDisplay.textContent = "CE";
    clearOper();
    inputDisplay.textContent = inputDisplay.textContent.slice(0, -1);
  } else if (/^[a-zA-Z]$/.test(key)) {
    alert("Error an Alphabet is pressed please enter a number :)");
  }

  checkAndCleanErrors();
});

function checkAndCleanErrors() {
  if (
    inputDisplay.textContent === "NaN" ||
    inputDisplay.textContent === "Error" ||
    inputDisplay.textContent === "Infinity"
  )
    clearAll();
}

function clearAll() {
  setTimeout(() => {
    inputDisplay.textContent = "";
    operDisplay.textContent = "";
  }, 1000);
}

function clearOper() {
  setTimeout(() => {
    operDisplay.textContent = "";
  }, 1000);
}

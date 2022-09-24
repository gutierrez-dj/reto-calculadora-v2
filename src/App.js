import { useState, useEffect } from "react";

// const store = [
//   {
//     num: 0,
//     prox_operator: null,
//   },
// ];
function App() {
  const [screen, setScreen] = useState("0");
  const [stringValue, setStringValue] = useState([]);
  const [number, setNumber] = useState("0");
  const [isCalculate, setIsCalculate] = useState(false);

  useEffect(() => {
    const pantalla =
      stringValue.length == 0 ? number : concatNumbers() + number;
    setScreen(pantalla);
  }, [number, stringValue]);

  useEffect(() => {
    if (isCalculate) calculate();
    setIsCalculate(false);
  }, [isCalculate]);

  //================================================================================================
  // Funciones concatenar
  //================================================================================================
  const handleAddNumber = (e) => {
    const numberButton = e.target.value;
    number === "0" ? setNumber(numberButton) : setNumber(number + numberButton);
  };
  const handleAddDecimal = (e) => {
    const decimalButton = e.target.value;
    if (number.indexOf(".") == -1) {
      setNumber(number + decimalButton);
    }
  };
  const handleAddOperator = (e) => {
    const operatorButton = e.target.value;
    setStringValue([
      ...stringValue,
      { num: number, prox_operator: operatorButton },
    ]);
    setNumber("0");
  };
  const concatNumbers = () => {
    return stringValue
      .map((item) => {
        return item.num + item.prox_operator;
      })
      .join("");
  };
  const handleCalculate = () => {
    if (stringValue.length == 0) {
      setScreen(number); // si no hay operaciones, se muestra el numero
    } else {
      setStringValue([...stringValue, { num: number, prox_operator: "" }]);
      setNumber("");
      setIsCalculate(true);
    }
  };
  //================================================================================================
  // Funciones de cambio
  //================================================================================================
  const handleClearAll = () => {
    setNumber("0");
    setStringValue([]);
  };
  const handleDelete = () => {
    if (number != "") { // si hay numeros en pantalla
      number.length == 1 && stringValue.length == 0
        ? handleClearAll("0")
        : setNumber(number.slice(0, -1));
    } else { 
      const newNumber = stringValue[stringValue.length - 1].num;
      const newstringValue = stringValue.slice(0, stringValue.length - 1);

      setStringValue(newstringValue);
      setNumber(newNumber);
    }
  };
  const calculate = () => {
    const temp = stringValue;
    let result = 0;

    if (temp.length > 2) {
      for (let i = 0; i < temp.length - 1; i++) {
        //calcula las operaciones * y /, termina con dos valor
        if (temp[i].prox_operator == "*" || temp[i].prox_operator == "/") {
          temp[i].num = operatorFuncion(i, temp);
          temp[i].prox_operator = temp[i + 1].prox_operator;
          temp.splice(i + 1, 1); //elimino el el siguiente elemento
        }
      }
    }
    result = operatorFuncion(0, temp);

    setStringValue([]);
    setNumber(result.toString());
  };
  const operatorFuncion = (i, cadena) => {
    try {
      switch (cadena[i].prox_operator) {
        case "+":
          return parseFloat(cadena[i].num) + parseFloat(cadena[i + 1].num);
        case "-":
          return parseFloat(cadena[i].num) - parseFloat(cadena[i + 1].num);
        case "*":
          return parseFloat(cadena[i].num) * parseFloat(cadena[i + 1].num);
        case "/":
          return parseFloat(cadena[i].num) / parseFloat(cadena[i + 1].num);
        default:
          return parseFloat(cadena[i].num);
      }
    } catch (error) {
      return "Error";
    }
  };

  return (
    <div>
      <div>
        <input
          value={screen}
          type="text"
          placeholder="Enter your name"
          disabled
        />
        <button onClick={handleDelete}>Borrar</button>
      </div>
      <div>
        <button value={1} onClick={handleAddNumber}>
          (1)
        </button>
        <button value={2} onClick={handleAddNumber}>
          (2)
        </button>
        <button value={3} onClick={handleAddNumber}>
          (3)
        </button>
        <button value={4} onClick={handleAddNumber}>
          (4)
        </button>
        <button value={5} onClick={handleAddNumber}>
          (5)
        </button>
        <button value={6} onClick={handleAddNumber}>
          (6)
        </button>
        <button value={7} onClick={handleAddNumber}>
          (7)
        </button>
        <button value={8} onClick={handleAddNumber}>
          (8)
        </button>
        <button value={9} onClick={handleAddNumber}>
          (9)
        </button>
        <button value={0} onClick={handleAddNumber}>
          (0)
        </button>
        <button value={"."} onClick={handleAddDecimal}>
          (.)
        </button>
      </div>
      <div>
        <button value={"+"} onClick={handleAddOperator}>
          +
        </button>
        <button value={"-"} onClick={handleAddOperator}>
          -
        </button>
        <button value={"*"} onClick={handleAddOperator}>
          *
        </button>
        <button value={"/"} onClick={handleAddOperator}>
          /
        </button>
        <button value={"="} onClick={handleCalculate}>
          =
        </button>
        <button onClick={handleClearAll}>AC</button>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";

// const store = [
//   {
//     num: 0,
//     prox_operator: null,
//   },
// ];
const useCalculate = () => {
    const [screen, setScreen] = useState("0");
    const [stringValue, setStringValue] = useState([]);
    const [number, setNumber] = useState("0");
    const [isCalculate, setIsCalculate] = useState(false);
  
    useEffect(() => {
      const pantalla =
        stringValue.length === 0 ? number : concatNumbers() + number;
      setScreen(pantalla);
    }, [number, stringValue]);
  
    useEffect(() => {
      if (isCalculate) calculate();
      setIsCalculate(false);
    }, [isCalculate]);
  
    //================================================================================================
    // Interaccion con el usuario
    //================================================================================================
    const handleAddNumber = (e) => {
      const numberButton = e.target.value;
      number === "0" ? setNumber(numberButton) : setNumber(number + numberButton);
    };
    const handleAddDecimal = (e) => {
      const decimalButton = e.target.value;
      if (number.indexOf(".") === -1) {
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
   
    const handleCalculate = () => {
      if (stringValue.length === 0) {
        setScreen(number); // si no hay operaciones, se muestra el numero
      } else {
        setStringValue([...stringValue, { num: number, prox_operator: "" }]);
        setNumber("");
        setIsCalculate(true);
      }
    };
    const handleClearAll = () => {
      setNumber("0");
      setStringValue([]);
    };
    const handleDelete = () => {
      if (number !== "") { // si hay numeros en pantalla
        number.length === 1 && stringValue.length === 0
          ? handleClearAll("0")
          : setNumber(number.slice(0, -1));
      } else { 
        const newNumber = stringValue[stringValue.length - 1].num;
        const newstringValue = stringValue.slice(0, stringValue.length - 1);
  
        setStringValue(newstringValue);
        setNumber(newNumber);
      }
    };
    //================================================================================================
    // Funciones de cambio
    //================================================================================================
    const concatNumbers = () => {
        return stringValue
          .map((item) => {
            return item.num + item.prox_operator;
          })
          .join("");
      };
    const calculate = () => {
      const temp = stringValue;
      let result = 0;
  
      if (temp.length > 2) {
        for (let i = 0; i < temp.length - 1; i++) {
          //calcula las operaciones * y /, termina con dos valor
          if (temp[i].prox_operator === "*" || temp[i].prox_operator === "/") {
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
  
  return [screen, handleAddNumber, handleAddDecimal, handleAddOperator, handleCalculate, handleClearAll, handleDelete];
}

export default useCalculate
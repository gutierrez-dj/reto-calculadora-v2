import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNumber,
  AddDecimal,
  AddOperator,
  ClearAll,
  Delete,
  CalculateButton,
  ReturnConcatNumbers,
  fetchCalculatorThunk,
  selectNumber,
  selectScreen,
} from "../redux/slice/calculateSlice";

 
const useCalculate = () => {
  const dispatch = useDispatch();
  const screen = useSelector(selectScreen);
  const number = useSelector(selectNumber);
  const stringValue = useSelector((state) => state.calculate.stringValue);
  const isCalculate = useSelector((state) => state.calculate.isCalculate); 

  useEffect(() => {
    dispatch(ReturnConcatNumbers());
  }, [number, stringValue]);

  useEffect(() => {
    if (isCalculate) dispatch(fetchCalculatorThunk(stringValue));
  }, [isCalculate]);

  //================================================================================================
  // Interaccion con el usuario
  //================================================================================================
  const handleAddNumber = (e) => {
    const numberButton = e.target.value;
    dispatch(AddNumber(numberButton));
  };
  const handleAddDecimal = (e) => {
    const decimalButton = e.target.value;
    dispatch(AddDecimal(decimalButton));
  };
  const handleAddOperator = (e) => {
    const operatorButton = e.target.value;
    dispatch(AddOperator(operatorButton));
  };

  const handleClearAll = () => {
    dispatch(ClearAll());
  };
  const handleDelete = () => {
    dispatch(Delete());
  };

  const handleCalculate = () => {
    dispatch(CalculateButton());
  };
  //================================================================================================
  // Funciones de cambio
  //================================================================================================
  // const concatNumbers = () => {
  //   return stringValue.length === 0
  //     ? number
  //     : stringValue
  //         .map((item) => {
  //           return item.num + item.prox_operator;
  //         })
  //         .join("") + number;
  // };
  // const calculate = () => {
  //   const temp = stringValue;
  //   let result = 0;

  //   if (temp.length > 2) {
  //     for (let i = 0; i < temp.length - 1; i++) {
  //       //calcula las operaciones * y /, termina con dos valor
  //       if (temp[i].prox_operator === "*" || temp[i].prox_operator === "/") {
  //         temp[i].num = basicOperation(i, temp);
  //         temp[i].prox_operator = temp[i + 1].prox_operator;
  //         temp.splice(i + 1, 1); //elimino el el siguiente elemento
  //       }
  //     }
  //   }
  //   result = basicOperation(0, temp);

  //   setStringValue([]);
  //   setNumber(result.toString());
  // };
  // const basicOperation = (i, cadena) => {
  //   try {
  //     switch (cadena[i].prox_operator) {
  //       case "+":
  //         return parseFloat(cadena[i].num) + parseFloat(cadena[i + 1].num);
  //       case "-":
  //         return parseFloat(cadena[i].num) - parseFloat(cadena[i + 1].num);
  //       case "*":
  //         return parseFloat(cadena[i].num) * parseFloat(cadena[i + 1].num);
  //       case "/":
  //         return parseFloat(cadena[i].num) / parseFloat(cadena[i + 1].num);
  //       default:
  //         return parseFloat(cadena[i].num);
  //     }
  //   } catch (error) {
  //     return "Error";
  //   }
  // };

  return [
    screen,
    handleAddNumber,
    handleAddDecimal,
    handleAddOperator,
    handleCalculate,
    handleClearAll,
    handleDelete,
  ];
};

export default useCalculate;

// //================================================================================================
//   // Interaccion con el usuario
//   //================================================================================================
//   const handleAddNumber = (e) => {
//     const numberButton = e.target.value;
//     number === "0" ? setNumber(numberButton) : setNumber(number + numberButton);
//   };
//   const handleAddDecimal = (e) => {
//     const decimalButton = e.target.value;
//     if (number.indexOf(".") === -1) {
//       setNumber(number + decimalButton);
//     }
//   };
//   const handleAddOperator = (e) => {
//     const operatorButton = e.target.value;
//     setStringValue([
//       ...stringValue,
//       { num: number, prox_operator: operatorButton },
//     ]);
//     setNumber("0");
//   };

//   const handleClearAll = () => {
//     setNumber("0");
//     setStringValue([]);
//   };
//   const handleDelete = () => {
//     if (number !== "") {
//       // si hay numeros en pantalla
//       number.length === 1 && stringValue.length === 0
//         ? handleClearAll("0")
//         : setNumber(number.slice(0, -1));
//     } else {
//       const newNumber = stringValue[stringValue.length - 1].num;
//       const newstringValue = stringValue.slice(0, stringValue.length - 1);

//       setStringValue(newstringValue);
//       setNumber(newNumber);
//     }
//   };

//   const handleCalculate = () => {
//     if (stringValue.length === 0) {
//       setScreen(number); // si no hay operaciones, se muestra el numero
//     } else {
//       setStringValue([...stringValue, { num: number, prox_operator: "" }]);
//       setNumber("");
//       setIsCalculate(true);
//     }
//   };
//   //================================================================================================
//   // Funciones de cambio
//   //================================================================================================
//   const concatNumbers = () => {
//     return stringValue.length === 0
//       ? number
//       : stringValue
//           .map((item) => {
//             return item.num + item.prox_operator;
//           })
//           .join("") + number;
//   };
//   const calculate = () => {
//     const temp = stringValue;
//     let result = 0;

//     if (temp.length > 2) {
//       for (let i = 0; i < temp.length - 1; i++) {
//         //calcula las operaciones * y /, termina con dos valor
//         if (temp[i].prox_operator === "*" || temp[i].prox_operator === "/") {
//           temp[i].num = basicOperation(i, temp);
//           temp[i].prox_operator = temp[i + 1].prox_operator;
//           temp.splice(i + 1, 1); //elimino el el siguiente elemento
//         }
//       }
//     }
//     result = basicOperation(0, temp);

//     setStringValue([]);
//     setNumber(result.toString());
//   };
//   const basicOperation = (i, cadena) => {
//     try {
//       switch (cadena[i].prox_operator) {
//         case "+":
//           return parseFloat(cadena[i].num) + parseFloat(cadena[i + 1].num);
//         case "-":
//           return parseFloat(cadena[i].num) - parseFloat(cadena[i + 1].num);
//         case "*":
//           return parseFloat(cadena[i].num) * parseFloat(cadena[i + 1].num);
//         case "/":
//           return parseFloat(cadena[i].num) / parseFloat(cadena[i + 1].num);
//         default:
//           return parseFloat(cadena[i].num);
//       }
//     } catch (error) {
//       return "Error";
//     }
//   };

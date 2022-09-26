export const basicOperation = (i, cadena) => {
    try {
      console.log(cadena[i].num, cadena[i].prox_operator);
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

 
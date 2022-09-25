export const basicOperation = (i, cadena) => {
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

 
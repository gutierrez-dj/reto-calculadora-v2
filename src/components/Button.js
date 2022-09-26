import React from "react";
import useCalculate from "../hooks/useCalculate";
import {
  cnst_calcular,
  cnst_limpiar_todo,
  cnst_borrar,
  cnst_operacion,
  cnst_numero,
  cnst_agregar_decimal,
} from "../constants/utility";

const Button = (props) => {
  const { value, typeButton } = props.props;
  let classButton = " button button-default-styles";
  let handleFunction;
  const [
    ,
    handleAddNumber,
    handleAddDecimal,
    handleAddOperator,
    handleCalculate,
    handleClearAll,
    handleDelete,
  ] = useCalculate();

  switch (typeButton) {
    case cnst_calcular:
      handleFunction = handleCalculate;
      break;
    case cnst_limpiar_todo:
      classButton = " button button-ac-styles";
      handleFunction = handleClearAll;
      break;
    case cnst_borrar:
      classButton = "btn btn-outline-secondary ps-3";
      handleFunction = handleDelete;
      break;
    case cnst_operacion:
      classButton = "button button-operation-styles";
      handleFunction = handleAddOperator;
      break;
    case cnst_numero:
      handleFunction = handleAddNumber;
      break;
    case cnst_agregar_decimal:
      handleFunction = handleAddDecimal;
      break;
    default:
      classButton = "button button-operation-styles";
      handleFunction = handleCalculate;
      break;
  }

  return (
    <button value={value} className={classButton} onClick={handleFunction}>
      {value}
    </button>
  );
};

export default Button;

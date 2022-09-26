import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNumber,
  AddDecimal,
  AddOperator,
  ClearAll,
  Delete,
  CalculateButton,
  UpdateScreen,
  fetchCalculatorThunk,
  selectNumber,
  selectScreen,
} from "../redux/slice/calculateSlice";

const useCalculate = () => {
  const dispatch = useDispatch();
  const screen = useSelector(selectScreen);
  const number = useSelector(selectNumber);
  const isCalculate = useSelector((state) => state.calculate.isCalculate);

  useEffect(() => {
    dispatch(UpdateScreen());
  }, [number]);

  useEffect(() => {
    if (isCalculate) dispatch(fetchCalculatorThunk());
  }, [isCalculate]);
//================================================================================================
  // Funcion adicional para elimnar "Infiniti" en la pantalla
  //================================================================================================
  const infinityDelete = () => {
    if (number == "Infinity") {
      dispatch(ClearAll());
    }
  };
  //================================================================================================
  // Interaccion con el usuario
  //================================================================================================
  
  function handleAddNumber(e) {
    infinityDelete();
    const numberButton = e.target.value;
    dispatch(AddNumber(numberButton));
  }
  function handleAddDecimal(e) {
    infinityDelete();
    const decimalButton = e.target.value;
    dispatch(AddDecimal(decimalButton));
  }
  function handleAddOperator(e) {
    const operatorButton = e.target.value;
    infinityDelete();
    if (number !== "0") {
      dispatch(AddOperator(operatorButton));
    }
  }
  function handleClearAll() {
    dispatch(ClearAll());
  }
  function handleDelete() {
    infinityDelete();
    dispatch(Delete());
  }

  function handleCalculate() {
    dispatch(CalculateButton());
  }

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

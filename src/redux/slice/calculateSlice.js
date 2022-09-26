import { createSlice } from "@reduxjs/toolkit";
import { basicOperation } from "../../utility/basicOperation";

const initialState = {
  screen: "0",
  number: "0",
  isCalculate: false,
  stringValue: [],
};

// export const fetchCalculator = createAsyncThunk(
//   "calculate/fetchCalculator",
//   (dispatch, getState) => {
//     console.log(getState());
//     const state = getState();
//     console.log(state ,"state");
//     const { stringValue } = state.calculate;

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

//    return result.toString();
//   }
// );

export const calculateSlice = createSlice({
  name: "calculate",
  initialState,
  //   extraReducers: {
  //     [fetchCalculator.fulfilled]: (state, action) => {
  //       state.isCalculate = false;
  //       state.number = action.payload;
  //       state.stringValue = [];
  //     },
  //     [fetchCalculator.pending]: (state) => {
  //       state.isCalculate = true;
  //     },
  //     [fetchCalculator.rejected]: (state) => {
  //       state.isCalculate = false;
  //     },
  //   },
  reducers: {
    AddNumber: (state, action) => {
      const numberButton = action.payload;
      state.number === "0"
        ? (state.number = numberButton)
        : (state.number = state.number + numberButton);
    },
    AddDecimal: (state, action) => {
      const decimalButton = action.payload;
      if (state.number.indexOf(".") === -1) {
        state.number = state.number + decimalButton;
      }
    },
    AddOperator: (state, action) => {
      const operatorButton = action.payload;
      state.stringValue = [
        ...state.stringValue,
        { num: state.number, prox_operator: operatorButton },
      ];
      state.number = "0";
    },
    ClearAll: (state) => {
      state.number = "0";
      state.stringValue = [];
    },
    Delete: (state) => {
      const { number, stringValue } = state;
      if (number !== "") {
        // si hay numeros en pantalla
        number.length === 1 && stringValue.length === 0
          ? (state.number = "0")
          : (state.number = number.slice(0, -1));
      } else {
        const newNumber = stringValue[stringValue.length - 1].num;
        const newstringValue = stringValue.slice(0, stringValue.length - 1);

        state.stringValue = newstringValue;
        state.number = newNumber;
      }
    },
    CalculateButton: (state) => {
      const { number, stringValue } = state;
      if (stringValue.length === 0) {
        state.screen = number; // si no hay operaciones, se muestra el numero
      } else {
        state.stringValue = [
          ...stringValue,
          { num: number, prox_operator: "" },
        ];
        state.number = "";
        state.isCalculate = true;
      }
    },
    UpdateScreen: (state) => {
      const { stringValue, number } = state;
      state.screen =
        stringValue.length === 0
          ? number
          : stringValue
              .map((item) => {
                return item.num + item.prox_operator;
              })
              .join("") + number;
    },
    ResultCalculate: (state, action) => {
      state.stringValue = [];
      state.number = action.payload.toString();
      state.isCalculate = false;
    },
  },
});

// Action creators
export const {
  AddNumber,
  AddDecimal,
  AddOperator,
  ClearAll,
  Delete,
  CalculateButton,
  UpdateScreen,
  ResultCalculate,
} = calculateSlice.actions;

// Para usar en el componente
export const selectCalculate = (state) => state.calculate;
export const selectScreen = (state) => state.calculate.screen;
export const selectNumber = (state) => state.calculate.number;
export const selectIsCalculate = (state) => state.calculate.isCalculate;

//Redux synchronous Thunks
export const fetchCalculatorThunk = () => (dispatch, getState) => { 
  const { stringValue } = selectCalculate(getState());
  const temp = [...stringValue]; // copia del array
  let result = 0;

  if (temp.length > 2) {
    for (let i = 0; i < temp.length - 1; i++) {
      //primero calcula las operaciones * y /
      if (temp[i].prox_operator === "*" || temp[i].prox_operator === "/") {
        temp.splice(i, 2, {
          num: basicOperation(i, temp).toString(),
          prox_operator: temp[i + 1].prox_operator,
        });
      }
    }
  }
  console.log(temp);
  while (temp.length > 1) {
    console.log(temp[0]);
    temp.splice(0, 2, {
      num: basicOperation(0, temp).toString(),
      prox_operator: temp[1].prox_operator,
    });
    result = temp[0].num;
  } 
  //Condicional para que no se muestre el resultado si no hay operaciones
  temp.length !== 0 && (dispatch(ResultCalculate(result)));
 
};
export default calculateSlice.reducer;

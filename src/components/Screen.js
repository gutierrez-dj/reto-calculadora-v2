import useCalculate from "../hooks/useCalculate";
import Button from "./Button";
import { cnst_borrar } from "../constants/utility";

const Screen = () => {
  const [screen] = useCalculate();
  return (
    <div className="input-group input-group-lg mb-3">
      <input
        value={screen}
        type="text"
        className="form-control bg-dark text-white p-2 fs-4"
        placeholder="Ingrese un numero"
        disabled
      /> 
      <Button
        props={{
          value: <i className="fa-solid fa-delete-left"></i>,
          typeButton: cnst_borrar,
        }}
      />
    </div>
  );
};

export default Screen;

import useCalculate from "../hooks/useCalculate";
import "../css/Button.css";
import Button from "./Button";
import { cnst_button } from "../constants/utility";

const ButtonBox = () => {
  return (
    <div className="d-flex justify-content-around flex-wrap ">
      {cnst_button.map((button, index) => {
        return (
          <Button
            key={index}
            props={{ value: button.num, typeButton: button.typeButton }}
          />
        );
      })}
    </div>
  );
};

export default ButtonBox;

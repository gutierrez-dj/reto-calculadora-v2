import ButtonBox from "./ButtonBox";
import Screen from "./Screen";
const Wrapper = () => {
  return (
    <div className="card text-bg-light mb-3" style={{ "maxWidth": " 38rem" }}>
      <div className="card-header">
        <h2 className="text-center">Reto calculadora v2</h2>
        <Screen />
      </div>
      <div className="card-body text-bg-dark">
        <ButtonBox />
      </div>
    </div>
  );
};

export default Wrapper;

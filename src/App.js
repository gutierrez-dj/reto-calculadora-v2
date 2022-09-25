import useCalculate from "./hooks/useCalculate"
function App() {
  
  const [screen,handleAddNumber, handleAddDecimal, handleAddOperator, handleCalculate, handleClearAll, handleDelete] = useCalculate();
  return (
    <div>
      <div>
        <input
          value={screen}
          type="text"
          placeholder="Enter your name"
          disabled
        />
        <button onClick={handleDelete}>Borrar</button>
      </div>
      <div>
        <button value={1} onClick={handleAddNumber}>
          (1)
        </button>
        <button value={2} onClick={handleAddNumber}>
          (2)
        </button>
        <button value={3} onClick={handleAddNumber}>
          (3)
        </button>
        <button value={4} onClick={handleAddNumber}>
          (4)
        </button>
        <button value={5} onClick={handleAddNumber}>
          (5)
        </button>
        <button value={6} onClick={handleAddNumber}>
          (6)
        </button>
        <button value={7} onClick={handleAddNumber}>
          (7)
        </button>
        <button value={8} onClick={handleAddNumber}>
          (8)
        </button>
        <button value={9} onClick={handleAddNumber}>
          (9)
        </button>
        <button value={0} onClick={handleAddNumber}>
          (0)
        </button>
        <button value={"."} onClick={handleAddDecimal}>
          (.)
        </button>
      </div>
      <div>
        <button value={"+"} onClick={handleAddOperator}>
          +
        </button>
        <button value={"-"} onClick={handleAddOperator}>
          -
        </button>
        <button value={"*"} onClick={handleAddOperator}>
          *
        </button>
        <button value={"/"} onClick={handleAddOperator}>
          /
        </button>
        <button value={"="} onClick={handleCalculate}>
          =
        </button>
        <button onClick={handleClearAll}>AC</button>
      </div>
    </div>
  );
}

export default App;

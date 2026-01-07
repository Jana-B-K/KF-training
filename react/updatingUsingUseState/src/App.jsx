import { useState } from "react";
import "./App.css";

function App() {
  const [cars, setCars] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [color, setColor] = useState("");
  const [model, setModel] = useState("");

  function handleCar() {
    const newCar = { year, color, model };
    setCars(c => [...c, newCar]);

    // optional reset
    setColor("");
    setModel("");
  }

  function handleRemove(index) {
    setCars(cars.filter((_, i) => i !== index));
  }

  return (
    <>
      <h1>List of cars</h1>

      <ul>
        {cars.map((car, index) => (
          <li
            key={index}
            onClick={() => handleRemove(index)}
            style={{ cursor: "pointer" }}
          >
            {car.color} {car.year} {car.model}
          </li>
        ))}
      </ul>

      <div className="form-group">
          <label>Year:</label>
          <input type="number" value={year} onChange={e => setYear(e.target.value)} />

          <label>Color:</label>
          <input type="text" value={color} onChange={e => setColor(e.target.value)} />

          <label>Model:</label>
          <input type="text" value={model} onChange={e => setModel(e.target.value)} />

          <button onClick={handleCar}>Add Car</button>
      </div>

    </>
  );
}

export default App;

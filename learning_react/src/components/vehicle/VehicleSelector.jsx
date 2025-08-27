import React, { useState } from "react";

export default function VehicleSelector({ onSelect }) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const handleSearch = () => {
    onSelect({ make, model, year });
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <select value={make} onChange={e => setMake(e.target.value)}>
        <option value="">Marca</option>
        <option value="Toyota">Toyota</option>
        <option value="Honda">Honda</option>
        <option value="Ford">Ford</option>
        <option value="Chevrolet">Chevrolet</option>
        <option value="Isuzu">Isuzu</option>
      </select>
      <input placeholder="Modelo" value={model} onChange={e => setModel(e.target.value)} />
      <input placeholder="Año" value={year} onChange={e => setYear(e.target.value)} />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}
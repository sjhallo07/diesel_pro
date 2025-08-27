import React, { useState } from "react";
import { products as allProducts } from "../store/products";
import VehicleSelector from "../components/vehicle/VehicleSelector";
import ProductList from "../components/catalog/ProductList";

export default function Home() {
  const [filtered, setFiltered] = useState(allProducts);

  const handleVehicleSelect = ({ make, model, year }) => {
    if (!make && !model && !year) {
      setFiltered(allProducts);
      return;
    }
    setFiltered(
      allProducts.filter(p =>
        p.compatibleVehicles.some(
          v =>
            (!make || v.make === make) &&
            (!model || v.model === model) &&
            (!year || String(v.year) === String(year))
        )
      )
    );
  };

  return (
    <div>
      <VehicleSelector onSelect={handleVehicleSelect} />
      <ProductList products={filtered} />
    </div>
  );
}
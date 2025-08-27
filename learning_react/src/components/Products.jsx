import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toast } from "react-toastify";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Bujía Diesel A",
    type: "bujias",
    price: 25.0,
    stock: 10,
    img: "https://via.placeholder.com/250x200?text=Bujia+A",
  },
  {
    id: 2,
    name: "Precalentador B",
    type: "precalentadores",
    price: 30.0,
    stock: 5,
    img: "https://via.placeholder.com/250x200?text=Precalentador+B",
  },
  {
    id: 3,
    name: "Repuesto C",
    type: "repuestos",
    price: 15.0,
    stock: 0,
    img: "https://via.placeholder.com/250x200?text=Repuesto+C",
  },
];

export default function Products() {
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const dispatch = useDispatch();

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.type === filter);

  // Lógica para importar productos desde Excel
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

      // Espera columnas: name, type, price, stock, img
      const imported = rows.map((row, idx) => ({
        id: products.length + idx + 1,
        name: row.name || `Producto ${products.length + idx + 1}`,
        type: row.type || "otros",
        price: Number(row.price) || 0,
        stock: Number(row.stock) || 0,
        img: row.img || "https://via.placeholder.com/250x200?text=Producto",
      }));
      setProducts((prev) => [...prev, ...imported]);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleAdd = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.name} agregado al carrito`);
  };

  return (
    <section className="products" id="productos">
      <div className="container">
        <h2>Nuestros Productos</h2>
        <div className="filter-options">
          <button
            className={`filter-btn${filter === "all" ? " active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Todos
          </button>
          <button
            className={`filter-btn${filter === "bujias" ? " active" : ""}`}
            onClick={() => setFilter("bujias")}
          >
            Bujías
          </button>
          <button
            className={`filter-btn${filter === "precalentadores" ? " active" : ""}`}
            onClick={() => setFilter("precalentadores")}
          >
            Precalentadores
          </button>
          <button
            className={`filter-btn${filter === "repuestos" ? " active" : ""}`}
            onClick={() => setFilter("repuestos")}
          >
            Repuestos
          </button>
        </div>
        <div className="import-section" style={{ margin: "1em 0" }}>
          <input
            type="file"
            id="excel-file"
            accept=".xlsx, .xls, .xlsm, .xlsb"
            style={{ display: "none" }}
            onChange={handleImport}
          />
          <button
            className="btn"
            onClick={() => document.getElementById("excel-file").click()}
          >
            <i className="fas fa-file-excel"></i> Importar Inventario (Excel)
          </button>
        </div>
        <div className="product-grid" id="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.img} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-price">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <button
                    className="add-to-cart"
                    disabled={product.stock === 0}
                    onClick={() => handleAdd(product)}
                  >
                    Agregar
                  </button>
                </div>
                <div
                  className={`stock ${
                    product.stock === 0
                      ? "out-of-stock"
                      : product.stock < 5
                      ? "low-stock"
                      : "in-stock"
                  }`}
                >
                  {product.stock === 0
                    ? "Sin stock"
                    : product.stock < 5
                    ? "Pocas unidades"
                    : "En stock"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
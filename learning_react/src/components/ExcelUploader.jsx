import React from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

export default function ExcelUploader({ onAddProducts, isAdmin }) {
  if (!isAdmin) return null;

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const products = XLSX.utils.sheet_to_json(sheet);
      onAddProducts(products);
      toast.success("Productos cargados desde Excel");
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label>
        <b>Agregar productos desde Excel (.xlsx):</b>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFile}
          style={{ marginLeft: "1rem" }}
        />
      </label>
    </div>
  );
}
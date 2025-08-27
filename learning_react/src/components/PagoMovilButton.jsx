import React, { useState } from "react";
import { toast } from "react-toastify";

const bancos = [
  {
    nombre: "Banco de Venezuela",
    telefono: "0412-1234567",
    cedula: "V-12345678",
    banco: "0102",
    titular: "DIESEL PRO C.A.",
  },
  {
    nombre: "Banesco",
    telefono: "0414-7654321",
    cedula: "V-87654321",
    banco: "0134",
    titular: "DIESEL PRO C.A.",
  },
  // Agrega más bancos si lo deseas
];

export default function PagoMovilButton({ total }) {
  const [show, setShow] = useState(false);

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("¡Copiado al portapapeles!");
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button
        style={{
          background: "#ffc107",
          color: "#222",
          border: "none",
          borderRadius: "4px",
          padding: "0.5rem 1rem",
          fontWeight: "bold",
        }}
        onClick={() => setShow(!show)}
      >
        {show ? "Ocultar Pago Móvil" : "Pagar con Pago Móvil"}
      </button>
      {show && (
        <div style={{ marginTop: "1rem", background: "#fffbe6", border: "1px solid #ffe082", borderRadius: "8px", padding: "1rem" }}>
          <p><strong>Monto a transferir:</strong> <span style={{ color: "#388e3c" }}>${total.toFixed(2)}</span></p>
          {bancos.map((b, idx) => (
            <div key={b.nombre} style={{ marginBottom: "1rem", borderBottom: idx < bancos.length-1 ? "1px solid #ffe082" : "none", paddingBottom: "0.5rem" }}>
              <h4>{b.nombre}</h4>
              <div>
                <span>Teléfono: <b>{b.telefono}</b></span>
                <button onClick={() => copy(b.telefono)} style={{ marginLeft: 8 }}>Copiar</button>
              </div>
              <div>
                <span>Cédula/RIF: <b>{b.cedula}</b></span>
                <button onClick={() => copy(b.cedula)} style={{ marginLeft: 8 }}>Copiar</button>
              </div>
              <div>
                <span>Banco: <b>{b.banco}</b></span>
                <button onClick={() => copy(b.banco)} style={{ marginLeft: 8 }}>Copiar</button>
              </div>
              <div>
                <span>Titular: <b>{b.titular}</b></span>
                <button onClick={() => copy(b.titular)} style={{ marginLeft: 8 }}>Copiar</button>
              </div>
            </div>
          ))}
          <p style={{ fontSize: "0.95em", color: "#888" }}>
            <b>Recuerda:</b> Después de transferir, envía el comprobante por WhatsApp o correo.
          </p>
        </div>
      )}
    </div>
  );
}
import React, { useEffect, useRef } from "react";

// Este componente renderiza el botón de PayPal usando el SDK
export default function PaypalButton({ total }) {
  const paypalRef = useRef();

  useEffect(() => {
    // Cargar el script de PayPal solo si no existe
    if (!window.paypal) {
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=sb&currency=USD";
      script.async = true;
      script.onload = () => renderButton();
      document.body.appendChild(script);
    } else {
      renderButton();
    }

    function renderButton() {
      window.paypal.Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal"
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total.toFixed(2)
                }
              }
            ]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(function (details) {
            alert("Pago completado por " + details.payer.name.given_name);
          });
        }
      }).render(paypalRef.current);
    }
    // Limpieza
    return () => {
      if (paypalRef.current) {
        paypalRef.current.innerHTML = "";
      }
    };
  }, [total]);

  return <div id="paypal-button-container" ref={paypalRef}></div>;
}

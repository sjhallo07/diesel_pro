import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { toast } from "react-toastify";

export default function PaypalButton({ total }) {
  const dispatch = useDispatch();

  return (
    <PayPalScriptProvider options={{ "client-id": "sb", currency: "USD" }}>
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total.toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(() => {
            toast.success("¡Pago realizado con éxito!");
            dispatch(clearCart());
          });
        }}
        onError={() => {
          toast.error("Error en el pago");
        }}
      />
    </PayPalScriptProvider>
  );
}

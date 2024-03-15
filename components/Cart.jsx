import React from "react";

export default function Cart({ cart }) {
  return (
    <>
      <h2>CARRITO DE COMPRA</h2>
      <div>
        <ul>
          {cart && cart.length > 0 ? ( // Verifica si cart no es undefined y tiene elementos
            cart.map((item, index) => (
              <li key={index}>
                {item.title} - Cantidad: {item.quantity} - {item.price}
              </li>
            ))
          ) : (
            <li>El carrito está vacío</li>
          )}
        </ul>
      </div>
    </>
  );
}

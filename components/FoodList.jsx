"use client";
import React, { useState, useEffect } from "react";

const getFoods = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/foods", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch foods");
    }

    return await response.json();
  } catch (error) {
    console.error("Error loading foods: ", error);
    return [];
  }
};

export default function FoodList() {
  const [foods, setFoods] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [cart, setCart] = useState([]);

  const [texto, setTexto] = useState("");

  const handleChange = (event) => {
    setTexto(event.target.value);
  };

  const decrementQuantity = (index) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((qty, i) => (i === index ? Math.max(qty - 1, 0) : qty))
    );
    updateCart(index, Math.max(quantities[index] - 1, 0));
  };

  const incrementQuantity = (index) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((qty, i) => (i === index ? qty + 1 : qty))
    );
    updateCart(index, quantities[index] + 1);
  };

  const updateCart = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index] = { ...foods[index], quantity };
    setCart(updatedCart);
  };

  useEffect(() => {
    const fetchData = async () => {
      const foodsData = await getFoods();
      setFoods(foodsData.foods);
      setQuantities(foodsData.foods.map(() => 0));
      setCart(foodsData.foods.map((food) => ({ ...food, quantity: 0 })));
    };
    fetchData();
  }, []);

  // Filtrar el carrito para mostrar solo los elementos con cantidad mayor a 0
  const filteredCart = cart.filter((item, index) => quantities[index] > 0);

  return (
    <>
      <div className="flex flex-wrap p-2 justify-center">
        {Array.isArray(foods) ? (
          foods.map((food, index) => (
            <div className="p-3" key={food.id || index}>
              <div className="flex flex-col justify-between content-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 min-w-80 min-h-80">
                <div className="min-w-80 min-h-80 bg-green-50 p-1">
                  <h1> IMAGEN</h1>
                </div>

                <div className="self-center p-4">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {food.title}
                  </h5>
                </div>

                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {food.ingredients}
                </p>

                <div className="self-center p-2">
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {food.description}
                  </p>
                </div>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  ${food.price}
                </p>

                <div className="flex self-center justify-center space-x-4 items-center p-4">
                  <button
                    className="btn bg-white p-3 rounded-3xl"
                    onClick={() => decrementQuantity(index)}
                  >
                    <h1>-</h1>
                  </button>

                  <p className="text-white">{quantities[index]}</p>

                  <button
                    className="btn bg-white p-3 rounded-3xl"
                    onClick={() => incrementQuantity(index)}
                  >
                    <h1>+</h1>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Cargando alimentos...</p>
        )}
      </div>
      <br />
      <hr className="border-t-4 border-black" />
      <br />
      <div className="flex">
        <div className="min-w-[60vw] max-w-[60vw] grid grid-cols-1 p-3">
          <h4 className="mb-2 justify-self-center text-2xl font-bold tracking-tight text-gray-900 dark:text-black p-4">
            Carrito
          </h4>
          <ul>
            {filteredCart.map((item, index) => (
              <li key={index}>
                <div className="flex justify-center p-1 m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <div className="p-6 min-w-[40%]">PHOTO</div>

                  <div className="p-6 min-w-[50%]">
                    <div>
                      <h8 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-2">
                        {item.title}
                      </h8>
                    </div>

                    <div>
                      <p className="font-normal text-gray-700 dark:text-gray-400 p-1">
                        Cantidad: {item.quantity} <br /> Item Price: $
                        {item.price} <br /> Subttl: $
                        {item.price * item.quantity}
                      </p>
                    </div>

                    <div className="flex self-center justify-center space-x-4 items-center p-4">
                      <button
                        className="btn bg-white p-3 rounded-3xl"
                        onClick={() => decrementQuantity(index)}
                      >
                        <h1>-</h1>
                      </button>

                      <p className="text-white">{item.quantity}</p>

                      <button
                        className="btn bg-white p-3 rounded-3xl"
                        onClick={() => incrementQuantity(index)}
                      >
                        <h1>+</h1>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}

            <div className="p-3 flex justify-center">
              <form action="">
                {/* 
                        <input id="GET-notes" className="rounded-full" type="text" name="name" /> */}
                <label
                  className="font-normal text-gray-700 dark:text-gray-400 p-1"
                  for="GET-notes"
                >
                  Notas de la orden <br />
                </label>
                <input type="text" value={texto} onChange={handleChange} />
              </form>
            </div>
          </ul>
        </div>

        <div className="flex flex-col p-3 min-w-[40vw] max-w-[40vw]">
          <h4 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-black p-4">
            Factura
          </h4>
          <br />
          <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-500">
            Subtotal de la orden: {} <br /> <br /> Taxes: {} <br /> <br /> Total: {}
          </h6>
        </div>
      </div>
    </>
  );
}

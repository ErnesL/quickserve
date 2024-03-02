"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

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
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ul>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <li></li>
        ))}
      </ul>
    </Box>
  );

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

  const calculateInvoice = (updatedCart) => {
    var subtotal = 0;
    var taxes = 0;
    var unroundedTotal = 0;
    var total = 0;
    for (let i = 0; i < updatedCart.length; i++) {
      if (updatedCart[i] != null) {
        subtotal += updatedCart[i].price * updatedCart[i].quantity;
      }
    }
    taxes = parseFloat((subtotal * 0.15).toFixed(2));
    unroundedTotal = subtotal + taxes;
    total = parseFloat(unroundedTotal.toFixed(2));
    return { subtotal, taxes, total };
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

  // Se genera carrito que solo incluye los items con cantidad mayor a 0 pero en la posicion correcta con respecto al arreglo quantity
  const filteredCart = new Array(foods.length).fill(null);
  for (let i = 0; i < foods.length; i++) {
    if (quantities[i] > 0) {
      filteredCart[i] = cart[i];
    }
  }

  const { subtotal, taxes, total } = calculateInvoice(filteredCart);

  //Es necesario declarar una funcion let foodCart en la cual se almacene el carrito de compras

  return (
    <>
      {/* drawer */}
        <div className="flex justify-end mr-[10vw] mt-[10vh]">
          {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                Preview del carrito
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
                <div className="flex">
                  <div className="min-w-[30vw] max-w-[50vw] grid grid-cols-1 p-3">
                    <h4 className="mb-2 justify-self-center text-2xl font-bold tracking-tight text-gray-900 dark:text-black p-4">
                      Carrito
                    </h4>
                    <ul>
                      {/* Se mapea el arreglo filteredCart de forma que solo seleccione las comidas y no los nulls. Si es null, entonces no muestra nada */}
                      {filteredCart.map((item, index) =>
                        item != null ? (
                          <li key={index}>
                            <div className="flex justify-center p-6 m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                              <div className="p-6 min-w-[40%] max-w-[40%] bg-green-50">
                                PHOTO
                              </div>

                              <div className="p-6 min-w-[50%] max-w-[50%]">
                                <div>
                                  <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-2">
                                    {item.title}
                                  </h4>
                                </div>

                                <div>
                                  <p className="font-normal text-gray-700 dark:text-gray-400 p-1">
                                    Cantidad: {item.quantity} <br />
                                  </p>
                                  <p className="font-normal text-gray-700 dark:text-gray-400 p-1">
                                    Item Price: ${item.price} <br />
                                  </p>
                                  <p className="font-normal text-gray-700 dark:text-gray-400 p-1">
                                    Subttl: ${item.price * item.quantity}
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
                        ) : null
                      )}

                      <div className="p-3 flex justify-center">
                        <form action="">
                          {/* 
                        <input id="GET-notes" className="rounded-full" type="text" name="name" /> */}
                          <label className="font-normal text-gray-700 dark:text-gray-400 p-1">
                            Notas de la orden <br /> <br />
                          </label>
                          <input
                            className="border-b border-black"
                            type="text"
                            value={texto}
                            onChange={handleChange}
                          />
                        </form>
                      </div>
                    </ul>
                    <h4 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-black p-4">
                      Factura
                    </h4>
                    <br />

                    <div className="p-2 ml-5">
                      <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-500">
                        Subtotal de la orden: ${subtotal} <br />
                      </h6>
                    </div>
                    <div className="p-2 ml-5">
                      <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-500">
                        Taxes: ${taxes} <br />
                      </h6>
                    </div>
                    <div className="p-2 ml-5">
                      <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-500">
                        Total: ${total}
                      </h6>
                    </div>
                  </div>
                </div>
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      {/* Tarjetas de comidas */}

      <div className="flex flex-wrap p-2 justify-center pt-5">
        {Array.isArray(foods) ? (
          foods.map((food, index) => (
            <div className="p-3" key={food.id || index}>
              <Card
                image={<h1>IMAGEN</h1>}
                title={food.title}
                ingredients={food.ingredients}
                description={food.description}
                price={food.price}
                quantity={quantities[index]}
                onDecrement={() => decrementQuantity(index)}
                onIncrement={() => incrementQuantity(index)}
              />
            </div>
          ))
        ) : (
          <p>{loading ? <CircularProgress /> : "Cargando alimentos..."}</p>
        )}
      </div>
      <br />
      <hr className="border-t-4 border-black" />
      <br />
    </>
  );
}

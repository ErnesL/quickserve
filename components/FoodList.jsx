"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import Box from "@mui/material/Box";
import Drawer from "@/components/Drawer";

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

const foodObjects = [];

async function writeCartToMongoDB(filteredCart) {
  filteredCart
    .filter((item) => item !== null)
    .map((item) => {
      foodObjects.push({
        title: item.title,
        description: item.description,
        ingredients: item.ingredients,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
        processed: false,
      });
    });

  try {
    const response = await fetch("http://localhost:3000/api/cart", {
      method: "POST",
      body: JSON.stringify(foodObjects),
    });

    if (!response.ok) {
      throw new Error("Failed to write cart to MongoDB");
    }

    console.log("Cart written to MongoDB successfully");
  } catch (error) {
    console.error("Error writing cart to MongoDB: ", error);
  }
}

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
  const [tableNumber, setTableNumber] = useState(3);

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

  const createJsonCart = (filteredCart, paidUsd, subtotal) => {
    const jsonCart = {
      foods: [],
      table: tableNumber,
      paidUsd: paidUsd,
      subtotal: subtotal,
      payment: true,
    };

    for (let i = 0; i < filteredCart.length; i++) {
      if (filteredCart[i] != null) {
        jsonCart.foods.push(filteredCart[i]);
      }
    }

    console.log(jsonCart);
    alert("Orden enviada");
  };

  // Se genera carrito que solo incluye los items con cantidad mayor a 0 pero en la posicion correcta con respecto al arreglo quantity
  //const filteredCartUI = cart.filter((item, index) => quantities[index] > 0);
  const filteredCart = new Array(foods.length).fill(null);
  for (let i = 0; i < foods.length; i++) {
    if (quantities[i] > 0) {
      filteredCart[i] = cart[i];
    }
  }

  const { subtotal, taxes, total } = calculateInvoice(filteredCart);

  return (
    <>
      {/* drawer */}
      <div className="flex justify-end mr-[10vw] mt-28">
        {["right"].map((anchor) => (
          <Drawer
            key={anchor}
            anchor={anchor}
            state={state}
            toggleDrawer={toggleDrawer}
            list={list}
            filteredCart={filteredCart}
            quantities={quantities}
            decrementQuantity={decrementQuantity}
            incrementQuantity={incrementQuantity}
            texto={texto}
            handleChange={handleChange}
            subtotal={subtotal}
            taxes={taxes}
            total={total}
            writeCartToMongoDB={writeCartToMongoDB}
          />
        ))}
      </div>

      {/* Tarjetas de comidas */}
      <br />
      <hr className="border-t-4 border-black" />
      <br />
      <h1
        className="text-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        id="entradas"
      >
        ENTRADAS
      </h1>
      <br />

      <div className="flex flex-wrap p-2 justify-center pt-5 z-0">
        {Array.isArray(foods) ? (
          foods.map((food, index) => {
            if (food.type === "entries") {
              return (
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
              );
            }
            return null;
          })
        ) : (
          <p>Cargando alimentos...</p>
        )}
      </div>

      <hr className="border-t-4 border-black" />
      <br />
      <h1
        className="text-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        id="platos"
      >
        COMIDAS
      </h1>
      <br />

      <div className="flex flex-wrap p-2 justify-center pt-5">
        {Array.isArray(foods) ? (
          foods.map((food, index) => {
            if (food.type === "food") {
              return (
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
              );
            }
            return null;
          })
        ) : (
          <p>Cargando alimentos...</p>
        )}
      </div>

      <hr className="border-t-4 border-black" />
      <br />
      <h1
        className="text-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        id="bebidas"
      >
        BEBIDAS
      </h1>
      <br />
      <div className="flex flex-wrap p-2 justify-center pt-5">
        {Array.isArray(foods) ? (
          foods.map((food, index) => {
            if (food.type === "drink") {
              return (
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
              );
            }
            return null;
          })
        ) : (
          <p>Cargando alimentos...</p>
        )}
      </div>

      <hr className="border-t-4 border-black" />
      <br />
      <h1
        className="text-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        id="postres"
      >
        POSTRES
      </h1>
      <br />
      <div className="flex flex-wrap p-2 justify-center pt-5">
        {Array.isArray(foods) ? (
          foods.map((food, index) => {
            if (food.type === "dessert") {
              return (
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
              );
            }
            return null;
          })
        ) : (
          <p>Cargando alimentos...</p>
        )}
      </div>

      <br />
      <hr className="border-t-4 border-black" />
      <br />
    </>
  );
}

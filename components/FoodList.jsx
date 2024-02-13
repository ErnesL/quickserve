"use client";
import Link from "next/link";

import { useState, useEffect } from "react";

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

  const decrementQuantity = (index) => {
    setQuantities(
      quantities.map((qty, i) => (i === index ? Math.max(qty - 1, 0) : qty))
    );
  };

  const incrementQuantity = (index) => {
    setQuantities(quantities.map((qty, i) => (i === index ? qty + 1 : qty)));
  };

  useEffect(() => {
    // Utilizamos useEffect para llamar a getFoods cuando el componente se monte.
    const fetchData = async () => {
      const foodsData = await getFoods();
      setFoods(foodsData.foods);
      // Inicializamos quantities con la misma longitud que foodsData.
      setQuantities(foods.map(() => 0));
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap p-2 justify-center">
        {Array.isArray(foods) ? (
          foods.map((food, index) => (
            <div
              className="p-3"
              key={food.id || index}
            >
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

                <div className="flex self-center justify-center space-x-4 items-center p-4 bg-red-50">
                  <button className="btn bg-blue-50 p-3 rounded-3xl">
                    <h1>-</h1>
                  </button>

                  <p>0</p>

                  <button className="btn bg-blue-50 p-3 rounded-3xl">
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
    </>
  );
}


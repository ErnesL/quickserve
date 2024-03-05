"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

const getCart = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/cart", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch cart");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading cart: ", error);
  }
};

async function writtingToMongoDb(_id) {
  try {
    const res = await fetch(`http://localhost:3000/api/cart/${_id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        newProcessed: true,
      }),
    });

    window.location.reload();

    if (!res.ok) {
      throw new Error("Falla al momento de actualizar processed: true");
    }
  } catch (error) {
    console.log(error);
  }
}

export default async function FoodListAdmin() {
  //#TODO: 002

  const { cart } = await getCart();

  return (
    <div className="bg-white min-h-[100vh] mt-20">
      <ul className="bg-white">
        <li className="mb-10 text-center text-2xl font-semibold whitespace-nowrap text-black">
          <h1
            className="text-center text-2xl font-semibold whitespace-nowrap dark:text-black mt-16"
            id="entradas"
          >
            <br />
            Próximo a preparar...
          </h1>
        </li>
        {cart.map((t, index) => (
          <li key={t._id} className="">
            <a className="p-4 border ml-[20vw] m-3 flex justify-between min-w-[15vw] max-w-[60vw] min-h-[15vh] rounded-lg bg-black hover:bg-black">
              <div className="flex flex-col justify-center">
                <h2 className="font-bold text-2xl text-white">{t.title}</h2>
                <div className="text-white">{t.description}</div>
                <h1 className="text-white"># {index + 1} </h1>
              </div>
              <button
                className="text-xl p-3 m-5 rounded-full bg-black hover:bg-[#9974D9] text-white duration-300"
                onClick={() => writtingToMongoDb(t._id)} // Fix: Pass a function reference instead of invoking the function immediately
              >
                Ready
              </button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

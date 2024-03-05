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
    <>
      <ul className="menu bg-base-200 w-100 content-center">
        <li className="menu-title text-center text-3xl">
          Próximo a preparar...
        </li>
        {cart.map((t, index) => (
          <li key={t._id} className="">
            <a className="p-4 border m-3 flex justify-between min-w-[15vw] max-w-[60vw] min-h-[15vh] border-gray-900 rounded-lg bg-gray-600 hover:bg-gray-500">
              <div className="flex flex-col justify-center">
                <h2 className="font-bold text-2xl text-white">{t.title}</h2>
                <div className="text-white">{t.description}</div>
                <h1 className="text-white"># {index + 1} </h1>
              </div>
              <button
                className="btn btn-outline btn-success"
                onClick={() => writtingToMongoDb(t._id)} // Fix: Pass a function reference instead of invoking the function immediately
              >
                Ready
              </button>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

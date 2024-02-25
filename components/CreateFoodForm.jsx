"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function addFoodForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !ingredients || !price) {
      alert("Todos los campos deben haber sido llenados.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/foods", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, ingredients, price }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Hubo un error al añadir la comida");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-5 pt-20"></div>
      <form
        onSubmit={handleSubmit}
        className=" w-1/2 flex m-auto flex-col gap-3 bg-slate-900 max-w-xs p-5 rounded-2xl"
      >
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Nombre"
        />

        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Descripción"
        />

        <input
          onChange={(e) => setIngredients(e.target.value)}
          value={ingredients}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Ingredientes"
        />

        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="border border-slate-500 px-8 py-2"
          type="number"
          min="0.10"
          step="0.01"
          placeholder="Precio"
        />

        <button
          type="submit"
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        >
          Añadir comida
        </button>
      </form>
    </>
  );
}

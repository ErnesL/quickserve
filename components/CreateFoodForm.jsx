"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function addFoodForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !ingredients || !price || !type) {
      alert("Todos los campos deben haber sido llenados.");
      return;
    }

    if (type!=="entries" && type!=="food" && type!=="dessert" && type!=="drink") {
      alert("El tipo de comida debe ser: entries, food, dessert, drink.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/foods", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, ingredients, price, type}),
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
      <div className="p-40">
        <div className="p-5">
          <h1 className="text-center text-2xl font-semibold text-blue-500">
            Agregando Comida
          </h1>
        </div>
        <div className="flex justify-center content-center p-5">
          <form onSubmit={handleSubmit} className="w-full max-w-sm">

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="name"
                >
                  Nombre:
                </label>
              </div>

              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-900"
                  id="name"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="Topic Title"
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="type"
                >
                  Tipo:
                </label>
              </div>

              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-900"
                  id="type"
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                  type="text"
                  placeholder="Ingresa el tipo de comida: entries, food, dessert, drink"
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="description"
                >
                  Descripcion:
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-900"
                  id="description"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder="Topic Description"
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="ingredients"
                >
                  Ingredientes:
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-900"
                  id="ingredients"
                  type="text"
                  onChange={(e) => setIngredients(e.target.value)}
                  value={ingredients}
                  placeholder="Topic Description"
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="price"
                >
                  Precios:
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-900"
                  id="price"
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  placeholder="Topic Description"
                  min="0.10"
                  step="0.01"
                />
              </div>
            </div>

            <div className="md:flex md:items-center p-5">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Crear Comida
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
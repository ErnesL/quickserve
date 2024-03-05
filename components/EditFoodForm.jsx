"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditFoodForm({
  id,
  title,
  type,
  description,
  ingredients,
  price,
}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newIngredients, setNewIngredients] = useState(ingredients);
  const [newPrice, setNewPrice] = useState(price);
  const [newType, setNewType] = useState(type);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      newType !== "entries" &&
      newType !== "food" &&
      newType !== "dessert" &&
      newType !== "drink"
    ) {
      alert("El tipo de comida debe ser: entries, food, dessert, drink.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/foods/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newTitle,
          newDescription,
          newIngredients,
          newPrice,
          newType,
        }),
      });

      if (!res.ok) {
        throw new Error("Falló al actualizar el ingrediente");
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-40 bg-white min-h-[100vh]">
      <div className="p-5">
        <h1 className="text-center text-4xl font-semibold text-[#9974D9]">
          Editando Comida
        </h1>
      </div>
      <div className="flex justify-center content-center p-5">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm"
        >
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="name"
              >
                Nombre:
              </label>
            </div>

            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-900"
                id="name"
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}
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
              <select
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-900"
                id="type"
                onChange={(e) => setNewType(e.target.value)}
                value={newType}
              >
                <option value="entries">entries</option>
                <option value="food">food</option>
                <option value="dessert">dessert</option>
                <option value="drink">drink</option>
              </select>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="description"
              >
                Descripcion:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-900"
                id="description"
                type="text"
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
                placeholder="Topic Description"
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="ingredients"
              >
                Ingredientes:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-900"
                id="ingredients"
                type="text"
                onChange={(e) => setNewIngredients(e.target.value)}
                value={newIngredients}
                placeholder="Topic Description"
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="price"
              >
                Precios:
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-900"
                id="price"
                type="number"
                onChange={(e) => setNewPrice(e.target.value)}
                value={newPrice}
                placeholder="Topic Description"
                min="0.10"
                step="0.01"
              />
            </div>
          </div>

          <div className="flex justify-center md:items-center p-5">
            
            <div className="">
              <button
                className="font-bold p-3 m-5 rounded-full bg-black hover:bg-[#9974D9] text-white duration-300"
                type="submit"
              >
                Modificar Comida
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

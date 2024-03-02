"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditFoodForm({
  id,
  title,
  description,
  ingredients,
  price,
}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newIngredients, setNewIngredients] = useState(ingredients);
  const [newPrice, setNewPrice] = useState(price);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div className="p-40">
      <div className="p-5">
        <h1 className="text-center text-2xl font-semibold text-black">
          Editando Comida
        </h1>
      </div>
      <div className="flex justify-center content-center p-5">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
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

          <div className="md:flex md:items-center p-5">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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

// <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-20">
    //   <label for="name">Nombre:</label>
    //   <input
    //     id="name"
    //     onChange={(e) => setNewTitle(e.target.value)}
    //     value={newTitle}
    //     className="border border-slate-500 px-8 py-2"
    //     type="text"
    //     placeholder="Topic Title"
    //   />
    //   <label for="description">Descripcion:</label>
    //   <input
    //     id="description"
    //     onChange={(e) => setNewDescription(e.target.value)}
    //     value={newDescription}
    //     className="border border-slate-500 px-8 py-2"
    //     type="text"
    //     placeholder="Topic Description"
    //   />
    //   <label for="ingredients">Ingredientes:</label>
    //   <input
    //     id="ingredients"
    //     onChange={(e) => setNewIngredients(e.target.value)}
    //     value={newIngredients}
    //     className="border border-slate-500 px-8 py-2"
    //     type="text"
    //     placeholder="Topic Description"
    //   />
    //   <label for="price">Precio:</label>
    //   <input
    //     id="price"
    //     onChange={(e) => setNewPrice(e.target.value)}
    //     value={newPrice}
    //     className="border border-slate-500 px-8 py-2"
    //     type="number"
    //     min="0.10"
    //     step="0.01"
    //     placeholder="Topic Description"
    //   />

    //   <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
    //     Update Topic
    //   </button>
    // </form>
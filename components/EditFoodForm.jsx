"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditFoodForm({
  id,
  title,
  type,
  description,
  ingredients,
  price,
  strImage,
}) {
  console.log(type);
  const defaultImage = `/menu/menu-degustacion.jpg`;

  let imagePath = "";
  if (typeof strImage === "string") {
    imagePath = `/menu/${strImage}`;
  } else {
    imagePath = defaultImage;
  }
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newIngredients, setNewIngredients] = useState(ingredients);
  const [newPrice, setNewPrice] = useState(price);
  const [newFile, setNewFile] = useState("");
  const [newImage, setImage] = useState(imagePath);
  const [newType, setNewType] = useState(type);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFile) {
      alert("Debes subir una imagen");
      return;
    }
    const formData = new FormData();
    formData.append("file", newFile);
    const response = await fetch("/api/image", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    console.log(data.image);
    console.log(typeof data.image);
    console.log(newType);
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
          newStrImage: data.image,
        }),
      });

      if (!res.ok) {
        throw new Error("Falló al actualizar el ingrediente");
      }

      router.push("/admin/foodList");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  //Código de js para el manejo de eventos de la imagen
  const fileInput = useRef(null);
  const dropZone = useRef(null);
  const img = useRef(null);
  const text = useRef(null);

  const uploadImage = (file) => {
    const fileReader = new FileReader();

    const loadHandler = (e) => {
      img.current.setAttribute("src", e.target.result);
      text.current.classList.add("hidden");
      fileReader.removeEventListener("load", loadHandler);
    };
    fileReader.onload = (e) => {
      setNewFile(file);
    };
    fileReader.addEventListener("load", loadHandler);
    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    const dz = dropZone.current;
    const fi = fileInput.current;
    fetch(imagePath)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], strImage, { type: blob.type });
        uploadImage(file);
      })
      .catch((error) => console.error(error));
    const clickHandler = () => fi.click();
    const dragoverHandler = (e) => {
      e.preventDefault();
      dz.classList.add("form-file__result--active");
    };
    const dragleaveHandler = (e) => {
      e.preventDefault();
      dz.classList.remove("form-file__result--active");
    };
    const dropHandler = (e) => {
      e.preventDefault();
      fi.files = e.dataTransfer.files;
      const file = fi.files[0];
      console.log(file);
      uploadImage(file);
    };
    const changeHandler = (e) => {
      const file = e.target.files[0];
      uploadImage(file);
    };

    dz.addEventListener("click", clickHandler);
    dz.addEventListener("dragover", dragoverHandler);
    dz.addEventListener("dragleave", dragleaveHandler);
    dz.addEventListener("drop", dropHandler);
    fi.addEventListener("change", changeHandler);

    return () => {
      dz.removeEventListener("click", clickHandler);
      dz.removeEventListener("dragover", dragoverHandler);
      dz.removeEventListener("dragleave", dragleaveHandler);
      dz.removeEventListener("drop", dropHandler);
      fi.removeEventListener("change", changeHandler);
    };
  }, []);

  return (
    <div className="p-40 bg-white min-h-[100vh]">
      <div className="p-5">
        <h1 className="text-center text-4xl font-semibold text-[#9974D9]">
          Editando Comida
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
                onChange={(e) => setNewPrice(e.target.value)}
                value={newPrice}
                placeholder="Topic Description"
                min="0.10"
                step="0.01"
              />
            </div>
          </div>
          {/*div destinado para alojar la imagen*/}
          <div className="flex flex-col items-center gap-y-5 mb-5">
            <div className="w-full">
              <input
                type="file"
                name="image"
                ref={fileInput}
                className="w-0 h-0 hidden opacity-0"
                accept=".jpg"
              />
            </div>
            <div
              className="overflow-hidden relative w-full h-72 bg-slate-950 rounded-lg <transition-colors border border-dashed border-blue-800 transition-colors duration-300 ease-linear z-10"
              ref={dropZone}
            >
              <p
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                ref={text}
              >
                Arrastra y suelta aquí
              </p>
              <img
                loading="lazy"
                className="w-full h-full z-50 object-cover"
                ref={img}
                alt=""
              />
            </div>
          </div>
          {/*final del div*/}
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

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Jimp from "jimp";
import { alertClasses } from "@mui/material";

export default function addFoodForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState("");
  const [strImage, setStrImage] = useState("");
  const [image, setImage] = useState("");
  const [load, setLoad] = useState(false);
  const [type, setType] = useState("");

  const router = useRouter();

  async function transformImage(inputPath) {
    try {
      const image = await Jimp.read(inputPath);
      const transformedImage = image.resize(600, 500).quality(100);
      return new Promise((resolve, reject) => {
        transformedImage.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
          if (err) reject(err);
          else resolve(new Blob([buffer], { type: Jimp.MIME_JPEG }));
        });
      });
    } catch (err) {
      console.error(err);
    }
  }

  function imageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //imageToBase64(image).then(async (dataUrl) => {
    //console.log(dataUrl); // Aquí está tu imagen en base64
    //setStrImage(dataUrl);
    if (load) {
      if (!title || !description || !ingredients || !price) {
        alert("Todos los campos deben haber sido llenados.");
        return;
      }

      if (
        type !== "entries" &&
        type !== "food" &&
        type !== "dessert" &&
        type !== "drink"
      ) {
        alert("El tipo de comida debe ser: entries, food, dessert, drink.");
        return;
      }
      try {
        const res = await fetch("http://localhost:3000/api/foods", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            ingredients,
            price,
            type,
            strImage,
          }),
        });

        if (res.ok) {
          router.push("/");
        } else {
          throw new Error("Hubo un error al añadir la comida");
        }
      } catch (error) {
        console.log(error);
      }
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
      setLoad(true);
      setImage(file);
    };
    fileReader.addEventListener("load", loadHandler);
    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    const dz = dropZone.current;
    const fi = fileInput.current;

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
      setLoad(false);
      fi.files = e.dataTransfer.files;
      const file = fi.files[0];
      uploadImage(file);
    };
    const changeHandler = (e) => {
      setLoad(false);
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
    <>
      <div className="p-40">
        <div className="p-5">
          <h1 className="text-center text-2xl font-semibold text-black">
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
                <select
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-900"
                  id="type"
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  <option value="entries">Entries</option>
                  <option value="food">Food</option>
                  <option value="dessert">Dessert</option>
                  <option value="drink">Drink</option>
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
            {/*div destinado para alojar la imagen*/}
            <div className="flex flex-col items-center gap-y-5 mb-5">
              <div className="w-full">
                <label
                  htmlFor="image"
                  className="block w-full mb-4 text-center"
                >
                  Foto de publicación
                </label>

                <input
                  type="file"
                  name="image"
                  ref={fileInput}
                  className="w-0 h-0 hidden opacity-0"
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
                  className="w-full h-full z-50 object-cover"
                  ref={img}
                  alt=""
                />
              </div>
            </div>
            {/*final del div*/}
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

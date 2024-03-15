"use client";
import Link from "next/link";

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
    return [];
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
  let auxId = 0;

  return (
    <div className="bg-white min-h-[100vh] mt-20">
      <div className="flex justify-center">
        <div className="mt-16 mr-96">
          <h1 className="text-xl p-5 rounded-full bg-black hover:bg-[#9974D9] text-white duration-300">
            <Link href={`/admin/addFood`} className="max-w-[20%]">
              Añadir Comida
            </Link>
          </h1>
        </div>
        <div className="ml-96 mt-16">
          <h1 className="text-xl p-5 rounded-full bg-black hover:bg-[#9974D9] text-white duration-300">
            <Link href={"/admin/foodList"} className="max-w-[20%]">
              Comidas del Menu
            </Link>
          </h1>
        </div>
      </div>
      <ul className="bg-white">
        <li className="mb-10 text-center text-2xl font-semibold whitespace-nowrap text-black">
          <h1
            className="text-center text-2xl font-semibold whitespace-nowrap dark:text-black mt-16"
            id="entradas"
          >
            Próximo a preparar...
          </h1>
        </li>
        <hr className="border-t-4 border-black max-w-[30vw] mx-auto" />
        <br />
        <br />
        <h2 className="ml-[20vw] text-3xl font-medium whitespace-nowrap text-[#9974D9]">
          Bebidas
        </h2>
        <br />
        {cart.map((t, index) => {
          if (t.type === "drink") {
            return (
              <li key={t._id} className="">
                <a className="p-4 border ml-[20vw] m-3 flex justify-between min-w-[15vw] max-w-[60vw] min-h-[15vh] rounded-lg bg-black hover:bg-black">
                  <div className="flex flex-col justify-center">
                    <h2 className="font-bold text-2xl text-white">{t.title}</h2>
                    <div className="text-white">{t.description}</div>
                    <h1 className="text-white">Nro de orden: {t.orderId} </h1>
                  </div>
                  <button
                    className="text-xl p-3 m-5 rounded-2xl bg-white hover:bg-[#9974D9] text-[#9974D9] hover:text-white duration-300"
                    onClick={() => writtingToMongoDb(t._id)} // Fix: Pass a function reference instead of invoking the function immediately
                  >
                    Ready
                  </button>
                </a>
              </li>
            );
          }
        })}
        <br />
        <br />
        <hr className="border-t-4 border-black max-w-[30vw] mx-auto" />
        <br />
        <br />
        <h2 className="ml-[20vw] text-3xl font-medium whitespace-nowrap text-[#9974D9]">
          Entradas
        </h2>
        <br />
        {cart.map((t, index) => {
          if (t.type === "entries") {
            return (
              <li key={t._id} className="">
                <a className="p-4 border ml-[20vw] m-3 flex justify-between min-w-[15vw] max-w-[60vw] min-h-[15vh] rounded-lg bg-black hover:bg-black">
                  <div className="flex flex-col justify-center">
                    <h2 className="font-bold text-2xl text-white">{t.title}</h2>
                    <div className="text-white">{t.description}</div>
                    <h1 className="text-white">Nro de orden: {t.orderId} </h1>
                  </div>
                  <button
                    className="text-xl p-3 m-5 rounded-2xl bg-white hover:bg-[#9974D9] text-[#9974D9] hover:text-white duration-300"
                    onClick={() => writtingToMongoDb(t._id)} // Fix: Pass a function reference instead of invoking the function immediately
                  >
                    Ready
                  </button>
                </a>
              </li>
            );
          }
        })}
        <br />
        <br />
        <hr className="border-t-4 border-black max-w-[30vw] mx-auto" />
        <br />
        <br />
        <h2 className="ml-[20vw] text-3xl font-medium whitespace-nowrap text-[#9974D9]">
          Comidas
        </h2>
        <br />
        {cart.map((t, index) => {
          if (t.type === "food") {
            return (
              <li key={t._id} className="">
                <a className="p-4 border ml-[20vw] m-3 flex justify-between min-w-[15vw] max-w-[60vw] min-h-[15vh] rounded-lg bg-black hover:bg-black">
                  <div className="flex flex-col justify-center">
                    <h2 className="font-bold text-2xl text-white">{t.title}</h2>
                    <div className="text-white">{t.description}</div>
                    <h1 className="text-white">Nro de orden: {t.orderId} </h1>
                  </div>
                  <button
                    className="text-xl p-3 m-5 rounded-2xl bg-white hover:bg-[#9974D9] text-[#9974D9] hover:text-white duration-300"
                    onClick={() => writtingToMongoDb(t._id)} // Fix: Pass a function reference instead of invoking the function immediately
                  >
                    Ready
                  </button>
                </a>
              </li>
            );
          }
        })}
        <br />
        <br />
        <hr className="border-t-4 border-black max-w-[30vw] mx-auto" />
        <br />
        <br />
        <h2 className="ml-[20vw] text-3xl font-medium whitespace-nowrap text-[#9974D9]">
          Postres
        </h2>
        <br />
        {cart.map((t, index) => {
          if (t.type === "dessert") {
            return (
              <li key={t._id} className="">
                <a className="p-4 border ml-[20vw] m-3 flex justify-between min-w-[15vw] max-w-[60vw] min-h-[15vh] rounded-lg bg-black hover:bg-black">
                  <div className="flex flex-col justify-center">
                    <h2 className="font-bold text-2xl text-white">{t.title}</h2>
                    <div className="text-white">{t.description}</div>
                    <h1 className="text-white">Nro de orden: {t.orderId} </h1>
                  </div>
                  <button
                    className="text-xl p-3 m-5 rounded-2xl bg-white hover:bg-[#9974D9] text-[#9974D9] hover:text-white duration-300"
                    onClick={() => writtingToMongoDb(t._id)} // Fix: Pass a function reference instead of invoking the function immediately
                  >
                    Ready
                  </button>
                </a>
              </li>
            );
          }
        })}
        <br />
        <br />
        <br />
      </ul>
    </div>
  );
}

// {cart.map((food, index) => {
//   if (food.type === "food") {
//     return (
//       <li key={food._id} className="">
//         <a className="p-4 border ml-[20vw] m-3 flex justify-between min-w-[15vw] max-w-[60vw] min-h-[15vh] rounded-lg bg-black hover:bg-black">
//           <div className="flex flex-col justify-center">
//             <h2 className="font-bold text-2xl text-white">
//               {food.title}
//             </h2>
//             <div className="text-white">{food.description}</div>
//             <h1 className="text-white">Nro de orden: {t.order} </h1>
//           </div>
//           <button
//             className="text-xl p-3 m-5 rounded-full bg-black hover:bg-[#9974D9] text-white duration-300"
//             onClick={() => writtingToMongoDb(food._id)}
//           >
//             Ready
//           </button>
//         </a>
//       </li>
//     );
//   }
// })}
// {cart.map((food, index) => {
//   if (food.type === "dessert") {
//     return (
//       <li key={food._id} className="">
//         <a className="p-4 border ml-[20vw] m-3 flex justify-between min-w-[15vw] max-w-[60vw] min-h-[15vh] rounded-lg bg-black hover:bg-black">
//           <div className="flex flex-col justify-center">
//             <h2 className="font-bold text-2xl text-white">
//               {food.title}
//             </h2>
//             <div className="text-white">{food.description}</div>
//             <h1 className="text-white">Nro de orden: {t.order} </h1>
//           </div>
//           <button
//             className="text-xl p-3 m-5 rounded-full bg-black hover:bg-[#9974D9] text-white duration-300"
//             onClick={() => writtingToMongoDb(food._id)}
//           >
//             Ready
//           </button>
//         </a>
//       </li>
//     );
//   }
// })}
// {cart.map((food, index) => {
//   if (food.type === "drink") {
//     return (
//       <li key={food._id} className="">
//         <a className="p-4 border ml-[20vw] m-3 flex justify-between min-w-[15vw] max-w-[60vw] min-h-[15vh] rounded-lg bg-black hover:bg-black">
//           <div className="flex flex-col justify-center">
//             <h2 className="font-bold text-2xl text-white">
//               {food.title}
//             </h2>
//             <div className="text-white">{food.description}</div>
//             <h1 className="text-white">Nro de orden: {t.order} </h1>
//           </div>
//           <button
//             className="text-xl p-3 m-5 rounded-full bg-black hover:bg-[#9974D9] text-white duration-300"
//             onClick={() => writtingToMongoDb(food._id)}
//           >
//             Ready
//           </button>
//         </a>
//       </li>
//     );
//   }
// })}

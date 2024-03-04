import Link from "next/link";
import RemoveBtn from "../../../components/RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

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

export default async function FoodListAdmin() {
  const { cart } = await getCart();

  //#TODO: 002
  return (
    <>
      <ul className="menu bg-base-200 w-100"> 
        <li className="menu-title">Próximo a preparar</li>
        {cart.map((t, index) => (
          <li key={t._id}>
            <a className="block p-4 border m-3 flex justify-between min-w-[25%] min-h-[15vh] border-gray-900 rounded-lg bg-gray-600 hover:bg-gray-500"> 
              <div className="flex flex-col justify-center">
                <h2 className="font-bold text-2xl text-white">{t.title}</h2>
                <div className="text-white">{t.description}</div>
                <h1 className="text-white">#{index + 1} </h1>
              </div>
              <button className="btn btn-outline btn-success">Ready</button>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

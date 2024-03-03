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

  return (
    <>
      <div className="flex flex-wrap p-1 justify-center ">
        <div className="p-4 border m-3 flex justify-between min-w-[25%] min-h-[15vh] border-gray-900 rounded-lg bg-gray-600 hover:bg-gray-500">
          <div className="flex flex-col justify-center">
            <h2 className="font-bold text-2xl text-white"></h2>
            <div className="text-white"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap p-1 justify-center ">
        {cart.map((t) => (
          <div
            key={t._id}
            className="p-4 border m-3 flex justify-between min-w-[25%] min-h-[15vh] border-gray-900 rounded-lg bg-gray-600 hover:bg-gray-500"
          >
            <div className="flex flex-col justify-center">
              <h2 className="font-bold text-2xl text-white">{t.title}</h2>
              <div className="text-white">{t.description}</div>
            </div>
            <div className="flex flex-col justify-center">
              <RemoveBtn id={t._id} />
              <Link href={`/admin/editFood/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import CardAdmin from "@/components/CardAdmin";
const getFoodList = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/foods", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function FoodListAdmin() {
  const { foods } = await getFoodList();

  return (
    <div className="bg-white">
      <div className="flex justify-center mt-5">
        <div className=" mt-16">
          <h1 className="text-xl p-3 m-5 rounded-full bg-black hover:bg-[#9974D9] text-white duration-300">
            <Link href={`/admin/addFood`} className="max-w-[20%]">
              Añadir Comida
            </Link>
          </h1>
        </div>
        <div className="flex justify-center mt-16">
        <h1 className="text-xl p-3 m-5 rounded-full bg-black hover:bg-[#9974D9] text-white duration-300">
            <Link href={"/admin/consumer"} className="max-w-[20%]">
              Ordenes en cola
            </Link>
          </h1>
        </div>
      </div>
      <h1 className="mt-5 text-center text-2xl font-semibold whitespace-nowrap text-black">
        ENTRADAS
      </h1>
      <br />
      <hr className="border-t-4 border-black max-w-[80vw] mx-auto" />
      <br />
      <div className="flex flex-wrap p-1 justify-center ">
        {foods.map((t) => {
          if (t.type === "entries") {
            return (
              <div
                key={t._id}
                className="m-3 flex justify-between min-w-[25%] min-h-[15vh]"
              >
                <CardAdmin
                  image={t.strImage}
                  title={t.title}
                  ingredients={t.ingredients}
                  description={t.description}
                  price={t.price}
                  id={t._id}
                />
              </div>
            );
          }
        })}
      </div>

      <br />
      <br />
      <h1 className="text-center text-2xl font-semibold whitespace-nowrap text-black">
        COMIDAS
      </h1>
      <br />
      <hr className="border-t-4 border-black max-w-[80vw] mx-auto" />
      <br />
      <div className="flex flex-wrap p-1 justify-center ">
        {foods.map((t) => {
          if (t.type === "food") {
            return (
              <div
                key={t._id}
                className="m-3 flex justify-between min-w-[25%] min-h-[15vh]"
              >
                <CardAdmin
                  image={t.strImage}
                  title={t.title}
                  ingredients={t.ingredients}
                  description={t.description}
                  price={t.price}
                  id={t._id}
                />
              </div>
            );
          }
        })}
      </div>

      <br />
      <br />
      <h1 className="text-center text-2xl font-semibold whitespace-nowrap text-black">
        POSTRES
      </h1>
      <br />
      <hr className="border-t-4 border-black max-w-[80vw] mx-auto" />
      <br />
      <div className="flex flex-wrap p-1 justify-center ">
        {foods.map((t) => {
          if (t.type === "dessert") {
            return (
              <div
                key={t._id}
                className="m-3 flex justify-between min-w-[25%] min-h-[15vh]"
              >
                <CardAdmin
                  image={t.strImage}
                  title={t.title}
                  ingredients={t.ingredients}
                  description={t.description}
                  price={t.price}
                  id={t._id}
                />
              </div>
            );
          }
        })}
      </div>

      <br />
      <br />
      <h1 className="text-center text-2xl font-semibold whitespace-nowrap text-black">
        BEBIDAS
      </h1>
      <br />
      <hr className="border-t-4 border-black max-w-[80vw] mx-auto" />
      <br />
      <div className="flex flex-wrap p-1 justify-center ">
        {foods.map((t) => {
          if (t.type === "drink") {
            return (
              <div
                key={t._id}
                className="m-3 flex justify-between min-w-[25%] min-h-[15vh]"
              >
                <CardAdmin
                  image={t.strImage}
                  title={t.title}
                  ingredients={t.ingredients}
                  description={t.description}
                  price={t.price}
                  id={t._id}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

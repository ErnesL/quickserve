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
    <>
      <div className="flex justify-center mt-24">
        <h1 className="text-xl max-w-[20%] p-3 m-5 rounded-lg bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white">
          <Link href={`/admin/addFood`} className="max-w-[20%]">
            Añadir Comida
          </Link>
        </h1>
      </div>
      <div className="flex justify-center mt-24">
        <h1 className="text-xl max-w-[20%] p-3 m-5 rounded-lg bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white">
          <Link href={"/admin/consumer"} className="max-w-[20%]">
          Ordenes en cola
          </Link>
        </h1>
      </div>

      <br />
      <br />
      <h1 className="text-center text-2xl font-semibold whitespace-nowrap dark:text-white">
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
                  image={<h1>IMAGEN</h1>}
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
      <h1 className="text-center text-2xl font-semibold whitespace-nowrap dark:text-white">
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
                  image={<h1>IMAGEN</h1>}
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
      <h1 className="text-center text-2xl font-semibold whitespace-nowrap dark:text-white">
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
                  image={<h1>IMAGEN</h1>}
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
      <h1 className="text-center text-2xl font-semibold whitespace-nowrap dark:text-white">
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
                  image={<h1>IMAGEN</h1>}
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
      {/* <div className="flex flex-wrap p-1 justify-center ">
        {foods.map((t) => (
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
      </div> */}
    </>
  );
}

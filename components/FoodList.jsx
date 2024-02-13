import Link from "next/link";

const getFoods = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/foods", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Foods");
    }
    return response.json();
  } catch (error) {
    console.log("Error loading foods: ", error);
  }
};

export default async function FoodList() {
  const { foods } = await getFoods();

  return (
    <>
      <div className="flex flex-wrap p-2 justify-center">
        {foods.map((f) => (
          <div className="p-3" key={f}>
            <div className="block flex flex-col justify-between content-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 min-w-80 min-h-80">
              <div className="min-w-80 min-h-80 bg-green-50 p-1">
                <h1> IMAGEN</h1>
              </div>

              <div className="self-center p-4">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {f.title}
                </h5>
              </div>

              <p className="font-normal text-gray-700 dark:text-gray-400">
                {f.ingredients}
              </p>

              <div className="self-center p-2">
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {f.description}
                </p>
              </div>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                ${f.price}
              </p>

              <div className="flex self-end self-center justify-center space-x-4 items-center p-4 bg-red-50">
                <button className="btn bg-blue-50 p-3 rounded-3xl">
                  <h1>-</h1>
                </button>

                <p>0</p>

                <button className="btn bg-blue-50 p-3 rounded-3xl">
                  <h1>+</h1>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

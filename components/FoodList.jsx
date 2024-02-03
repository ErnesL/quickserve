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
      {foods.map((f) => (
        <div key={f}>
          <a
            href="#"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 "
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {f.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {f.description}
            </p>
          </a>
        </div>
      ))}
    </>
  );
}

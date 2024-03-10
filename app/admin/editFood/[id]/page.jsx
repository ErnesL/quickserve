import EditFoodForm from "@/components/EditFoodForm";

const getFoodById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/foods/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditFood({ params }) {
  const { id } = params;
  const { food } = await getFoodById(id);
  const { title, description, type, ingredients, price, strImage } = food;

  return (
    <EditFoodForm
      id={id}
      title={title}
      type={type}
      description={description}
      ingredients={ingredients}
      price={price}
      strImage={strImage}
    />
  );
}

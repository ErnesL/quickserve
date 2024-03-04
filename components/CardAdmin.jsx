import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";



export default function CardAdmin({ image, title, ingredients, description, price, id }) {
  const defaultImage =
    "https://catering.grupoelescondite.com/wp-content/uploads/2020/07/menu-degustacion.jpg";

  const renderImage =
    typeof image === "string" ? (
      <img src={image || defaultImage} alt={title || "Plate"} />
    ) : (
      image
    );

  return (
    <div className="card card-side w-96 bg-black shadow-xls min-w-[30vw]">
      <figure className="max-w-[10vw] min-w-[10vw]">
        <img src={defaultImage} alt={title || "Plate"} />
      </figure>
      <div className="card-body min-w-[20vw]">
        <h2 className="card-title text-white">{title || "Title"}</h2>
        <p className="text-white">{description}</p>
        <p className="text-white">${price || 0}</p>
        <div className="flex flex-row justify-center">
          <RemoveBtn id={id} />
          <Link href={`/admin/editFood/${id}`}>
            <HiPencilAlt size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}

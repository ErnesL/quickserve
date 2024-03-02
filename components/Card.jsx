import Link from "next/link";

export default function Card({
  image,
  title,
  description,
  price,
  quantity,
  onDecrement,
  onIncrement,
}) {
  const defaultImage = "https://catering.grupoelescondite.com/wp-content/uploads/2020/07/menu-degustacion.jpg";

  const renderImage = typeof image === 'string' ? (
    <img src={image || defaultImage} alt={title || "Plate"} />
  ) : image;

  return (
    <div className="card card-compact w-96 bg-black shadow-xls rounded">
      <figure>
        <img src={defaultImage} alt={title || "Plate"} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">{title || "Title"}</h2>
        <p className="text-white">{description || "Description"}</p>
        <p className="text-white">${price || 0}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className="card-actions">
          <button className="btn btn-circle text-white" onClick={onDecrement}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
          </button>
          <p className="text-white text-center">{quantity}</p>
          <button className="btn btn-circle btn-outline text-white" onClick={onIncrement}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12M6 12h12" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

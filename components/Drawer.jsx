import React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import CardPreview from "@/components/CardPreview";

export default function CustomDrawer({
  anchor,
  state,
  toggleDrawer,
  list,
  filteredCart,
  quantities,
  decrementQuantity,
  incrementQuantity,
  texto,
  handleChange,
  subtotal,
  taxes,
  total,
  writeCartToMongoDB,
}) {
  return (
    <React.Fragment key={anchor}>
      <Button
        className="hover:bg-white hover:text-black bg-blue-900 p-3 pt-4 text-white rounded-lg font-bold"
        onClick={() => {
          alert("Un personal de asistencia va en camino a su mesa");
        }}
      >
        Ayuda
      </Button>
      <Button
        className="hover:bg-white hover:text-black bg-gray-600 p-3 pt-4 text-white rounded-lg font-bold"
        onClick={toggleDrawer(anchor, true)}
      >
        Orden
      </Button>

      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
        <div className="flex">
          <div className="min-w-[30vw] max-w-[40vw] grid grid-cols-1 p-3">
            <h4 className="mb-2 justify-self-center text-2xl font-bold tracking-tight text-gray-900 dark:text-black p-4">
              Carrito
            </h4>
            <ul>
              {/* Se mapea el arreglo filteredCart de forma que solo seleccione las comidas y no los nulls. Si es null, entonces no muestra nada */}
              {filteredCart.map((food, index) =>
                food != null ? (
                  <li key={index} className="m-2">
                    <CardPreview
                      image={<h1>IMAGEN</h1>}
                      title={food.title}
                      ingredients={food.ingredients}
                      description={food.description}
                      price={food.price}
                      quantity={quantities[index]}
                      onDecrement={() => {
                        decrementQuantity(index);
                      }}
                      onIncrement={() => incrementQuantity(index)}
                    />
                  </li>
                ) : null
              )}

              <div className="p-3 flex justify-center">
                <form action="">
                  {/* 
                                                <input id="GET-notes" className="rounded-full" type="text" name="name" /> */}
                  <label className="font-normal text-gray-700 dark:text-gray-400 p-1">
                    Notas de la orden <br /> <br />
                  </label>
                  <input
                    className="border-b border-black bg-white"
                    type="text"
                    value={texto}
                    onChange={handleChange}
                  />
                </form>
              </div>
            </ul>
            <h4 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-black p-4">
              Factura
            </h4>
            <br />
            <div className="p-2 ml-5">
              <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-500">
                Subtotal de la orden: ${subtotal} <br />
              </h6>
            </div>
            <div className="p-2 ml-5">
              <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-500">
                Taxes: ${taxes} <br />
              </h6>
            </div>
            <div className="p-2 ml-5">
              <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-500">
                Total: ${total}
              </h6>
            </div>
            //#TODO: 004
            <button
              className="btn btn-outline btn-success"
              onClick={() => {
                {
                  writeCartToMongoDB(filteredCart);
                }
              }}
            >
              Pagar
            </button>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

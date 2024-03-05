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
        className="bg-black hover:bg-[#ff5a60d3] text-white font-bold py-2 px-4 rounded-full"
        onClick={() => {
          alert("Un personal de asistencia va en camino a su mesa");
        }}
      >
        Ayuda
      </Button>
      <Button
        className="hover:bg-[#9974D9] bg-black p-3 pt-4 text-white rounded-full font-bold"
        onClick={toggleDrawer(anchor, true)}
      >
        Ordenar
      </Button>

      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
        <div className="flex justify-center">
          <div className="min-w-[30vw] max-w-[40vw] flex flex-col justify-center p-3">
            <h4 className="mb-2 text-center text-5xl font-bold tracking-tight tet-[#9974D9] p-4">
              Orden
            </h4>
            <ul>
              {/* Se mapea el arreglo filteredCart de forma que solo seleccione las comidas y no los nulls. Si es null, entonces no muestra nada */}
              {filteredCart.map((food, index) =>
                food != null ? (
                  <li key={index} className="m-5">
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

              {/* <div className="p-3 flex justify-center">
                <form action="">
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
              </div> */}
            </ul>
            <h4 className="mb-2 text-center text-5xl font-bold tracking-tight tet-[#9974D9] p-4">
              <br />
              <hr
        className="border-t-4 border-black max-w-[80vw] mx-auto"
        id="entradas"
      />
              <br />
              Factura
              <br />
            <br />
            </h4>
            
            <br />
            <div className="flex justify-end max-w-[80%] p-2 ml-5">
              <div className="">
                <h6 className="text-[#9974D9] mb-2 text-3xl font-bold tracking-tight">
                  Subtotal de la orden:
                </h6>
              </div>
              <div>
              <h6 className="ml-3 font-bold text-4xl"> ${subtotal} <br /></h6>
              </div>
            </div>

            <div className="flex justify-end max-w-[80%] p-2 ml-5">
              <div>
                <h6 className="text-[#9974D9] mb-2 text-3xl font-bold tracking-tight">
                  Taxes:
                </h6>
              </div>
              <div>
              <h6 className=" ml-3 font-bold text-4xl"> ${taxes} <br /> </h6>
              </div>
            </div>

            <div className="flex justify-end max-w-[80%] p-2 ml-5">
              <div>
                <h6 className="mb-2 text-3xl font-bold tracking-tight text-[#9974D9]">
                  Total:
                </h6>
              </div>
              <div>
              <h6 className=" ml-3 font-bold text-4xl"> ${total} <br /> <br /> <br /> </h6>
              </div>
            </div>
            <br />
            
            <br />
            <button
              className=" bg-black self-center  max-w-[25%] w-full p-3 rounded-full font-bold text-white hover:bg-[#9974D9] "
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

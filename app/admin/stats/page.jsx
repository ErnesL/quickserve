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
    return [];
  }
};

export default async function stats() {
  const { cart } = await getCart();

  function promedio(cart) {
    let auxId = cart[0].orderId;
    const totales = [];
    let totalPerOrder = 0;
    cart.forEach((element) => {
      if (element.orderId === auxId) {
        totalPerOrder += element.total;
      } else {
        totales.push(totalPerOrder);
        totalPerOrder = 0;
        totalPerOrder += element.total;
        auxId = element.orderId;
      }
    });
    totales.push(totalPerOrder);
    const promedio =
      totales.reduce((acc, curr) => acc + curr, 0) / totales.length;
    return promedio;
  }

  function foodAndQty(cart) {
    
    const comidasContadas = []; // Array que guarda los nombres de las comidas que ya se contaron

    const top5 = []; // Array que guarda Arrays "comidaWCantidad" que a su vez guardan el nombre de la comida y la cantidad de veces que se vendieron

    let i = 0;

    while (i < cart.length - 1) {

      const comidaWCantidad = []; // Array que guarda el nombre de la comida y la cantidad de veces que se vendieron

      if (!comidasContadas.includes(cart[i].title)) { // Si la comida no se ha contado
        comidasContadas.push(cart[i].title);
        comidaWCantidad.push(cart[i].title);
        let elementCount = 0;
        let elementAux = cart[i].title;
        cart.map((element) => {
          if (element.title === elementAux) {
            elementCount += element.quantity;
          }
        });
        comidaWCantidad.push(elementCount);
        top5.push(comidaWCantidad);
      }
      i++;
    }
    return top5.sort((a, b) => a[1] - b[1]); // Retorna el array ordenado de menor a mayor
  }

  function top5less(cart) {
    const array = foodAndQty(cart);
    const less5 = array.slice(0, 5);
    return less5;
  }

  function top5(cart) {
    const array = foodAndQty(cart);
    const top5 = array.slice(-5).reverse();
    return top5;
  }

  return (
    <div className="bg-white min-h-[100vh] mt-20">
      <br />
      <br />
      <h2 className="text-center text-3xl font-medium whitespace-nowrap text-[#9974D9]">
        Top 5 platos mas vendidos
      </h2>
      <h3>
        {top5(cart).map((t, index) => (
          <div className="ml-[35vw] rounded-full flex justify-center min-w-[30vw] max-w-[30vw] min-h-[10vh] p-5 bg-[#e2d8ef] m-5">
            <div className="text-black self-center mr-10">
              <h2 className="text-[#deca6f] text-6xl">{index + 1}th</h2>
            </div>
            <div className="self-center text-black">
              <div>
                <h2 className="text-black text-4xl">{t[0]}</h2>
              </div>
              <div>
                <h2>Cantidad vendido: {t[1]}</h2>
              </div>
            </div>
          </div>
        ))}
      </h3>
      <br />
      <hr className="border-t-4 border-black max-w-[30vw] mx-auto" />
      <br />
      <br />
      <br />
      <h2 className="text-center text-3xl font-medium whitespace-nowrap text-[#9974D9]">
        Top 5 platos menos vendidos
      </h2>
      <h3>
        {top5less(cart).map((t, index) => (
          <div className="ml-[35vw] rounded-full flex justify-center min-w-[30vw] max-w-[30vw] min-h-[10vh] p-5 bg-[#e2d8ef] m-5">
            <div className="text-black self-center mr-10">
              <h2 className="text-[#deca6f] text-6xl">{index + 1}th</h2>
            </div>
            <div className="self-center text-black">
              <div>
                <h2 className="text-black text-4xl">{t[0]}</h2>
              </div>
              <div>
                <h2>Cantidad vendido: {t[1]}</h2>
              </div>
            </div>
          </div>
        ))}
      </h3>
      <br />
      <hr className="border-t-4 border-black max-w-[30vw] mx-auto" />
      <br />
      <br />
      <br />
      <h2 className="text-center text-3xl font-medium whitespace-nowrap text-[#9974D9]">
        Ganancias Diarias, Semanales y Mensuales
      </h2>
      <br />
      <hr className="border-t-4 border-black max-w-[30vw] mx-auto" />
      <br />
      <br />
      <br />
      <h2 className="text-center text-3xl font-medium whitespace-nowrap text-[#9974D9]">
        Ganancias Netas Diarias, Semanales y Mensuales
      </h2>
      <br />
      <hr className="border-t-4 border-black max-w-[30vw] mx-auto" />
      <br />
      <br />
      <br />
      <h2 className="text-center text-3xl font-medium whitespace-nowrap text-[#9974D9]">
        Promedio de consumo por orden
      </h2>
      <br />
      <br />
      <h3 className="text-center text-3xl font-medium whitespace-nowrap text-[#42be2f]">
        $ {promedio(cart).toFixed(2)}
      </h3>
      <br />
      <br />
      <br />
    </div>
  );
}

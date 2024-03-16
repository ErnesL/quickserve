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

      if (!comidasContadas.includes(cart[i].title)) {
        // Si la comida no se ha contado
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
  // const createdAt = new Date(element.createdAt);
  // const createdAtDay = createdAt.getDate();
  // const createdAtMonth = createdAt.getMonth() + 1;
  // const createdAtYear = createdAt.getFullYear();
  // const dat = new Date(createdAtYear, createdAtMonth, createdAtDay);
  // const dat2 = new Date(createdAtYear, createdAtMonth, createdAtDay+7);
  // console.log(dat);
  // console.log(dat2);

  function gananciasDay(cart) {
    const ganancias = [];
    let auxDay1 = new Date(cart[0].createdAt).getDate();
    let totalPerDay = 0;
    cart.forEach((element) => {
      let auxDay2 = new Date(element.createdAt).getDate();
      if (auxDay1 === auxDay2) {
        totalPerDay += element.total;
      } else {
        totalPerDay = (totalPerDay * 1.15).toFixed(2);
        ganancias.push(totalPerDay);
        totalPerDay = 0;
        totalPerDay += element.total;
        auxDay1 = auxDay2;
      }
    });
    totalPerDay = (totalPerDay * 1.15).toFixed(2);
    ganancias.push(totalPerDay);
    console.log(ganancias);
    return ganancias;
  }

  function gananciasWeek(cart) {
    const ganancias = [];
    let auxDay1 = new Date(cart[0].createdAt).getDate();
    let totalPerWeek = 0;
    cart.forEach((element) => {
      let auxDay2 = new Date(element.createdAt).getDate();
      if (auxDay2 - auxDay1 < 6) {
        totalPerWeek += element.total;
      } else {
        totalPerWeek = (totalPerWeek * 1.15).toFixed(2);
        ganancias.push(totalPerWeek);
        totalPerWeek = 0;
        totalPerWeek += element.total;
        auxDay1 = auxDay2;
      }
    });
    totalPerWeek = (totalPerWeek * 1.15).toFixed(2);
    ganancias.push(totalPerWeek);
    return ganancias;
  }

  function gananciasMonth(cart) {
    const ganancias = [];
    let auxMonth1 = new Date(cart[0].createdAt).getMonth();
    let totalPerMonth = 0;
    cart.forEach((element) => {
      let auxMonth2 = new Date(element.createdAt).getMonth();
      if (auxMonth1 === auxMonth2) {
        totalPerMonth += element.total;
      } else {
        totalPerMonth = (totalPerMonth * 1.15).toFixed(2);
        ganancias.push(totalPerMonth);
        totalPerMonth = 0;
        totalPerMonth += element.total;
        auxMonth1 = auxMonth2;
      }
    });
    totalPerMonth = (totalPerMonth * 1.15).toFixed(2);
    ganancias.push(totalPerMonth);
    console.log(ganancias);
    return ganancias;
  }

  function ordenesDay(cart) {
    const ordenes = [];
    let auxDay1 = new Date(cart[0].createdAt).getDate();
    let auxOrder1 = cart[0].orderId;
    let totalPerDay = 1;
    cart.forEach((element) => {
      console.log(totalPerDay);
      let auxDay2 = new Date(element.createdAt).getDate();
      let auxOrder2 = element.orderId;
      if (auxDay1 === auxDay2) {
        console.log("entro")
        if (auxOrder1 !== auxOrder2){
          totalPerDay += 1;
          auxOrder1 = auxOrder2;  
        }
      } else {
        ordenes.push(totalPerDay);
        totalPerDay = 0;
        totalPerDay += 1;
        auxDay1 = auxDay2;
        auxOrder1 = auxOrder2;  
      }
    });
    ordenes.push(totalPerDay);
    console.log(ordenes);
    return ordenes;
  }

  function ordenesWeek(cart) {
    const ordenes = [];
    let auxDay1 = new Date(cart[0].createdAt).getDate();
    let auxOrder1 = cart[0].orderId;
    let totalPerWeek = 1;
    cart.forEach((element) => {
      let auxDay2 = new Date(element.createdAt).getDate();
      let auxOrder2 = element.orderId;
      if (auxDay2 - auxDay1 < 6) {
        if (auxOrder1 !== auxOrder2){
          totalPerWeek += 1;
          auxOrder1 = auxOrder2;  
        }
      } else {
        ordenes.push(totalPerWeek);
        totalPerWeek = 0;
        totalPerWeek += 1;
        auxDay1 = auxDay2;
        auxOrder1 = auxOrder2;  
      }
    });
    ordenes.push(totalPerWeek);
    console.log(ordenes);
    return ordenes;
  }

  function ordenesMonth(cart) {
    const ordenes = [];
    let auxMonth1 = new Date(cart[0].createdAt).getMonth();
    let auxOrder1 = cart[0].orderId;
    let totalPerMonth = 1;
    cart.forEach((element) => {
      let auxMonth2 = new Date(element.createdAt).getMonth();
      let auxOrder2 = element.orderId;
      if (auxMonth1 === auxMonth2) {
        if (auxOrder1 !== auxOrder2){
          totalPerMonth += 1;
          auxOrder1 = auxOrder2;  
        }
      } else {
        ordenes.push(totalPerMonth);
        totalPerMonth = 0;
        totalPerMonth += 1;
        auxMonth1 = auxMonth2;
        auxOrder1 = auxOrder2;  
      }
    });
    ordenes.push(totalPerMonth);
    console.log(ordenes);
    return ordenes;
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
        Ganancias Diarias
      </h2>
      <h3>
        {gananciasDay(cart).map((t, index) => (
          <div className="ml-[30vw] rounded-full flex justify-center min-w-[40vw] max-w-[40vw] min-h-[10vh] p-5 bg-[#e2d8ef] m-5">
            <div className="text-black self-center mr-10">
              <h2 className="text-[#deca6f] text-6xl">Day {index + 1}</h2>
            </div>
            <div className="self-center text-black">
              <div>
                <h2 className="text-black text-4xl">Ingreso: $ {t}</h2>
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
        Ganancias Semanales
      </h2>
      <h3>
        {gananciasWeek(cart).map((t, index) => (
          <div className="ml-[30vw] rounded-full flex justify-center min-w-[40vw] max-w-[40vw] min-h-[10vh] p-5 bg-[#e2d8ef] m-5">
            <div className="text-black self-center mr-10">
              <h2 className="text-[#deca6f] text-6xl">Week {index + 1}</h2>
            </div>
            <div className="self-center text-black">
              <div>
                <h2 className="text-black text-4xl">Ingreso: $ {t}</h2>
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
        Ganancias Mensuales
      </h2>
      <h3>
        {gananciasMonth(cart).map((t, index) => (
          <div className="ml-[30vw] rounded-full flex justify-center min-w-[40vw] max-w-[40vw] min-h-[10vh] p-5 bg-[#e2d8ef] m-5">
            <div className="text-black self-center mr-10">
              <h2 className="text-[#deca6f] text-6xl">Month {index + 1}</h2>
            </div>
            <div className="self-center text-black">
              <div>
                <h2 className="text-black text-4xl">Ingreso: $ {t}</h2>
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
        Ordenes Diarias
      </h2>
      <h3>
        {ordenesDay(cart).map((t, index) => (
          <div className="ml-[30vw] rounded-full flex justify-center min-w-[40vw] max-w-[40vw] min-h-[10vh] p-5 bg-[#e2d8ef] m-5">
            <div className="text-black self-center mr-10">
              <h2 className="text-[#deca6f] text-6xl">Day {index + 1}</h2>
            </div>
            <div className="self-center text-black">
              <div>
                <h2 className="text-black text-4xl">Cantidad de ordenes: {t}</h2>
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
        Ordenes Semanales
      </h2>
      <h3>
        {ordenesWeek(cart).map((t, index) => (
          <div className="ml-[30vw] rounded-full flex justify-center min-w-[40vw] max-w-[40vw] min-h-[10vh] p-5 bg-[#e2d8ef] m-5">
            <div className="text-black self-center mr-10">
              <h2 className="text-[#deca6f] text-6xl">Week {index + 1}</h2>
            </div>
            <div className="self-center text-black">
              <div>
                <h2 className="text-black text-4xl">Cantidad de ordenes: {t}</h2>
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
        Ordenes Mensuales
      </h2>
      <h3>
        {ordenesMonth(cart).map((t, index) => (
          <div className="ml-[30vw] rounded-full flex justify-center min-w-[40vw] max-w-[40vw] min-h-[10vh] p-5 bg-[#e2d8ef] m-5">
            <div className="text-black self-center mr-10">
              <h2 className="text-[#deca6f] text-6xl">Month {index + 1}</h2>
            </div>
            <div className="self-center text-black">
              <div>
                <h2 className="text-black text-4xl">Cantidad de ordenes: {t}</h2>
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

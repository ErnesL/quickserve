# TODO

### FRONTEND

- `002` Necesito que, utilizando `cart`, muestren de forma ordenada (puede ser mediante un carrusel o reutilizando el codigo principal con una numeracion) las comidas almacenadas en `cart`.

- Es necesario tener un sistema de reseñas para cada comida individual. Recuerden utilizar `food.rating` para acceder al rating de cada comida.

- `003` Es necesario un boton de "check" para que el chef pueda marcar como lista una orden. `./consumer/page.jsx`.

- Es necesario dividir el menu por `["entries", "food", "drink", "dessert"]`.

- Es necesario filtrar el menu por `["entries", "food", "drink", "dessert"]` utilizando el `navbar`.

- Al final del menu, debe estar toda la informacion para ponerse en contacto con `Quickserve`.

### BACKEND

- Handling para vista protegida. Para este sprint seria bueno que nada mas colocando /admin pueda ingresar. Para el ultimo sprint vamos a utilizar un sistema CRUD especifico para los usuarios.

- `001` Es necesario colocar aqui un formatter para que todos los elementos de `food` queden almacenado en foodObjects para después colocar en un {`foodObjects`, `tableOrder`} y enviarlo a la base de datos.

- Falta colocar una ruta PUT que modifique el valor de `processed` a true una vez que el chef lo marque.

- Falta colocar el handling para las imagenes.

### ESTADISTICAS

- El sistema debe permitir al dueño del restaurante ver el top 5 de los platos más vendidos diarios o mensuales.

- El sistema debe permitir al dueño del restaurante ver el top 5 de los platos menos vendidos diarios o mensuales.

- Los platos más y menos vendidos deben mostrarse de manera clara y comprensible, con la cantidad de ventas correspondiente a cada plato.

- El sistema debe calcular automáticamente y actualizar la lista de los platos más y menos vendidos en base a los datos de ventas registrados.

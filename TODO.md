# TODO

### FRONTEND

##### Hay que borrar todas las comidas almacenadas y agregar dummy info correcta de Asian Cuisine a la DB. NOTA: Procurar utilizar los atributos importantes de `./model/Food.js`

- `002` Necesito que, utilizando `cart`, muestren de forma ordenada (puede ser mediante un carrusel o reutilizando el codigo principal con una numeracion) las comidas almacenadas en `cart`.

- `003` Es necesario un boton de "check" para que el chef pueda marcar como lista una orden. `./consumer/page.jsx`.

- `004` Agregar un formulario para que el cliente pueda escribir cualquier comentario relacionado a su orden y este puede ser accedido como `cart.clientComments`

- Es necesario filtrar el menu por `["entries", "food", "drink", "dessert"]` utilizando el `navbar`.

- Como dueño del local, quiero una interfaz de agregar y modificar comidas más intuitiva para mejorar el proceso de gestión del menú.

- Al final del menu, debe estar toda la informacion para ponerse en contacto con `Quickserve` marca registrada.

- Es necesario tener un sistema de reseñas para cada comida individual. Recuerden utilizar `food.rating` para acceder al rating de cada comida.

- Boton en el preview para pedir ayuda de un agente de customer service. Seria chevere que al momento de hacer click, se imprime una noticia de que 'un agente autorizado esta en camino a resolver cualquier duda que tengas'

- Usar `https://daisyui.com/components/alert/` para hacer alertas que se vean bonitas

### BACKEND

###### Tema de la FOTO @ROY

- Handling para vista protegida. Para este sprint seria bueno que nada mas colocando /admin pueda ingresar. Para el ultimo sprint vamos a utilizar un sistema CRUD especifico para los usuarios.

- Falta colocar una ruta PUT que modifique el valor de `processed` a true una vez que el chef lo marque.

- Falta colocar el handling para las imagenes.

# DONE

Coloquen aqui las tareas que van completando para revisar que esten bien

- Es necesario dividir el menu por `["entries", "food", "drink", "dessert"]`. Puedes acceder utilizando food.type === 'entries'.

# NOT DOABLE ATM

- `001` Es necesario colocar aqui un formatter para que todos los elementos de `food` queden almacenado en foodObjects para después colocar en un {`foodObjects`, `tableOrder`} y enviarlo a la base de datos.

### ESTADISTICAS

- El sistema debe permitir al dueño del restaurante ver el top 5 de los platos más vendidos diarios o mensuales.

- El sistema debe permitir al dueño del restaurante ver el top 5 de los platos menos vendidos diarios o mensuales.

- Los platos más y menos vendidos deben mostrarse de manera clara y comprensible, con la cantidad de ventas correspondiente a cada plato.

- El sistema debe calcular automáticamente y actualizar la lista de los platos más y menos vendidos en base a los datos de ventas registrados.

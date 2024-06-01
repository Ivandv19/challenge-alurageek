// Función asincrónica para obtener la lista de productos desde la API
async function listaProductos() {
  try {
    // Realiza una solicitud GET a la API para obtener la lista de productos
    const conexion = await fetch('http://localhost:3001/productos');
    // Convierte la respuesta a formato JSON
    const conexionConvertida = await conexion.json();
    // Devuelve la lista de productos obtenida de la API
    return conexionConvertida;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la obtención de los productos
    console.error('Error al obtener los productos:', error);
    throw error; // Lanza el error para que pueda ser capturado por la función que llama
  }
}

// Función asincrónica para crear un nuevo producto en la API
async function creaProducto(id, nombre, precio, imagen) {
  try {
    // Realiza una solicitud POST a la API para crear un nuevo producto
    const conexion = await fetch('http://localhost:3001/productos', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        id: id,
        nombre: nombre,
        precio: `$${precio}`,
        imagen: imagen
      })
    });
    // Convierte la respuesta a formato JSON
    const conexionConvertida = conexion.json();

    // Verifica si la solicitud fue exitosa
    if (!conexion.ok) {
      throw new Error('ha ocurrido un error al enviar el video');
    }

    // Devuelve la respuesta convertida (puede ser útil en algunos casos)
    return conexionConvertida;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la creación del producto
    console.error('Error al crear el producto:', error);
    throw error;
  }
}

// Función asincrónica para eliminar un producto de la API
async function eliminarProducto(id) {
  try {
    // Realiza una solicitud DELETE a la API para eliminar el producto con el ID especificado
    const response = await fetch(`http://localhost:3001/productos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Verifica si la solicitud fue exitosa
    if (response.ok) {
      console.log('Producto eliminado correctamente');
      // Aquí podrías actualizar la interfaz de usuario para reflejar el producto eliminado
    } else {
      console.error('Error al eliminar el producto:', response.statusText);
    }
  } catch (error) {
    // Maneja cualquier error de red que ocurra durante la eliminación del producto
    console.error('Error de red:', error);
  }
}

// Exporta las funciones de conexión API como un objeto para su uso en otros archivos
export const conexionAPI = {
  listaProductos, creaProducto, eliminarProducto,
}
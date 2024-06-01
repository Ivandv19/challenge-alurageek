import { conexionAPI } from './conexionAPI.js';

// Función para obtener el ID del producto a eliminar
function obtenerIdProducto(boton) {
  // Busca el elemento .producto__card más cercano al botón y obtiene su ID
  return boton.closest('.producto__card').querySelector('.btn__borrar').dataset.id;
}

// Función asincrónica para eliminar un producto
async function eliminarProductos(id) {
  try {
    // Llama a la función eliminarProducto de la conexión API para eliminar el producto con el ID dado
    await conexionAPI.eliminarProducto(id);
    console.log('Producto eliminado correctamente de la base de datos');
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
}

// Event listener para los clics en los botones de eliminar
document.addEventListener('click', async function(event) {
  // Verifica si el elemento clicado tiene la clase 'btn__borrar'
  if (event.target.classList.contains('btn__borrar')) {
    console.log('Botón de eliminar clicado');
    // Obtiene el ID del producto asociado al botón
    const idProducto = obtenerIdProducto(event.target);
    // Pregunta al usuario si está seguro de eliminar el producto
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      // Llama a la función para eliminar el producto
      await eliminarProductos(idProducto);
    }
  }
});
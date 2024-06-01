import { conexionAPI } from "./conexionAPI.js";


const lista = document.querySelector('[data-lista]');

// Función para crear una tarjeta de producto
function crearCard(id, nombre, precio, imagen) {
    const producto = document.createElement('div');
    producto.className = 'producto__card';
    producto.innerHTML = `
        <img class="producto__img" src="${imagen}" alt="imagenProducto">
        <p class="producto__nombre">${nombre}</p>
        <div class="producto__precio__y__borrar">
            <p class="producto__precio">${precio}</p>
            <div class="borrar__container">
            <button class="btn__borrar" data-id=${id}></button>
            <img class="img__borrar" src="/img/icon_borrar.png" alt="imagenBorrar">
            </div>
        </div>`;
    return producto;
}

// Función para crear una línea de productos
function crearLinea() {
    const linea = document.createElement('div');
    linea.className = 'productos__line';
    return linea;
}

// Función para verificar y gestionar las líneas de productos
function verificarLinea() {
    // Obtener todas las líneas de productos
    const lineas = document.querySelectorAll('.productos__line');

    // Verificar si no hay líneas o si la última línea está llena
    if (lineas.length === 0 || lineas[lineas.length - 1].children.length >= 3) {
        // Si no hay líneas o la última línea está llena, crear una nueva línea
        const nuevaLinea = crearLinea();
        lista.appendChild(nuevaLinea);
    }

    // Obtener la última línea (puede ser la recién creada)
    const ultimaLinea = document.querySelector('.productos__line:last-child');
    return ultimaLinea;
}

async function listarProductos() {
    try {
        const listaAPI = await conexionAPI.listaProductos();

        listaAPI.forEach((producto) => {
            // Verificar y obtener la línea para agregar el producto
            const lineaActual = verificarLinea();
            const tarjetaProducto = crearCard(producto.id, producto.nombre, producto.precio, producto.imagen); // Pasar el ID del producto como primer argumento
            lineaActual.appendChild(tarjetaProducto);
        });
    } catch (error) {
        lista.innerHTML = `<h2 class='mensaje__titulo'>Ha ocurrido un problema con la conexión</h2>`;
        console.error('Error al obtener los productos:', error);
    }
}

listarProductos();

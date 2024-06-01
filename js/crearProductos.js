import { conexionAPI } from "./conexionAPI.js";

const formulario = document.querySelector('[data-formulario]');

// Función para obtener el último ID de la base de datos
async function obtenerUltimoId() {
    try {
        const productos = await conexionAPI.listaProductos();
        // Si no hay productos, retornar 0 como último ID
        if (productos.length === 0) {
            return 0;
        }
        // Obtener el último producto de la lista y retornar su ID
        const ultimoProducto = productos[productos.length - 1];
        return parseInt(ultimoProducto.id);
    } catch (error) {
        console.error('Error al obtener el último ID:', error);
        throw error;
    }
}

// Función para generar un nuevo ID a partir del último ID
function generarNuevoId(ultimoId) {
    return (ultimoId + 1).toString();
}

// Función para validar si un ID ya está en uso
async function idEsValido(id) {
    try {
        const productos = await conexionAPI.listaProductos();
        // Verificar si el ID ya está en uso
        return !productos.some(producto => producto.id === id);
    } catch (error) {
        console.error('Error al validar el ID:', error);
        throw error;
    }
}

// Función para crear un nuevo producto
async function crearProducto(id, nombre, precio, imagen) {
    try {
        await conexionAPI.creaProducto(id, nombre, precio, imagen);
        console.log('Producto creado exitosamente');
    } catch (error) {
        console.error('Error al crear el producto:', error);
        throw error;
    }
}

// Función principal para manejar el envío del formulario
async function manejarEnvioFormulario(evento) {
    evento.preventDefault();
    try {
        // Obtener el último ID de la base de datos
        const ultimoId = await obtenerUltimoId();
        // Generar un nuevo ID incrementando el último ID en uno
        const nuevoId = generarNuevoId(ultimoId);
        // Verificar si el nuevo ID es válido y no está en uso
        if (await idEsValido(nuevoId)) {
            // Obtener los valores del formulario
            const nombre = document.querySelector('[data-nombre]').value;
            const precio = document.querySelector('[data-precio]').value;
            const imagen = document.querySelector('[data-imagen]').value;
            // Crear el nuevo producto
            await crearProducto(nuevoId, nombre, precio, imagen);
        } else {
            console.error('El nuevo ID no es válido o está en uso');
        }
    } catch (error) {
        console.error('Error al manejar el envío del formulario:', error);
    }
}

formulario.addEventListener('submit', manejarEnvioFormulario);
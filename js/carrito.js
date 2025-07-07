document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-carrito");
  const resumen = document.getElementById("resumen-carrito");

  function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    contenedor.innerHTML = "";
    resumen.innerHTML = "";

    if (carrito.length === 0) {
      contenedor.innerHTML = "<p>El carrito está vacío.</p>";
      return;
    }

    let total = 0;
    carrito.forEach((producto, index) => {
      const item = document.createElement("div");
      item.className = "producto-carrito";
      item.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <button onclick="eliminarProducto(${index})">Eliminar</button>
      `;
      contenedor.appendChild(item);
      total += producto.precio;
    });

    resumen.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
  }

  window.eliminarProducto = function(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  };

  window.vaciarCarrito = function() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
  };

  window.finalizarCompra = function() {
    localStorage.removeItem("carrito");
    contenedor.innerHTML = "<h3>¡Gracias por su compra!</h3>";
    resumen.innerHTML = "";
  };

  mostrarCarrito();
})

function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    contador.textContent = `(${carrito.length})`;
  }
}

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  alert(`"${producto.nombre}" fue agregado al carrito.`);
}

document.addEventListener("DOMContentLoaded", () => {
  const enlaceCarrito = document.querySelector("a[href='carrito.html'], a[href='pagina/carrito.html']");
  if (enlaceCarrito) {
    const contador = document.createElement("span");
    contador.id = "contador-carrito";
    contador.style.marginLeft = "8px";
    contador.style.fontWeight = "bold";
    enlaceCarrito.appendChild(contador);

    actualizarContador();

  }

  const lista = document.getElementById("lista-productos");
  if (lista) {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(productos => {
        productos.forEach(producto => {
          const card = document.createElement("div");
          card.className = "producto";
          card.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}" />
            <h3>${producto.title}</h3>
            <p>${producto.description.substring(0, 100)}...</p>
            <p><strong>$${producto.price}</strong></p>
            <button class="agregar-carrito">Agregar al carrito</button>
          `;
          const boton = card.querySelector(".agregar-carrito");
          boton.addEventListener("click", () => {
            agregarAlCarrito({
              nombre: producto.title,
              precio: producto.price
            });
          });

          lista.appendChild(card);
        });
      })
      .catch(error => {
        lista.innerHTML = "<p>Error al cargar productos.</p>";
        console.error("Error:", error);
      });
  }
});

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir archivos estáticos (tu HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta API ejemplo (backend)
app.get('/api/compras', (req, res) => {
  // Aquí podrías devolver datos JSON simulando "las compras"
  res.json([
    { id: 1, producto: 'Bidón 5L', cantidad: 3 },
    { id: 2, producto: 'Dispensador eléctrico', cantidad: 1 },
  ]);
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


function toggleCarrito() {
  const dropdown = document.getElementById("carrito-dropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Opcional: cerrar carrito al hacer clic fuera
window.addEventListener("click", function (e) {
  const carrito = document.getElementById("carrito-dropdown");
  const trigger = document.querySelector(".carrito-header");
  if (!carrito.contains(e.target) && !trigger.contains(e.target)) {
    carrito.style.display = "none";
  }
});

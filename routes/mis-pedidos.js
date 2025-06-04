const express = require('express');
const router = express.Router();
const db = require('../db');  // Ajusta la ruta si tu conexión a DB está en otro lado

// Middleware para verificar sesión activa
function asegurarseAutenticado(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/login'); // o donde esté tu login real
  }
}

// Ruta para mostrar pedidos
router.get('/mis-pedidos', asegurarseAutenticado, async (req, res) => {
  const usuario_id = req.session.user.id;

  try {
    const resultado = await db.query(
      `SELECT p.id AS pedido_id, p.fecha, p.estado, pr.nombre AS producto, dp.cantidad
       FROM pedidos p
       JOIN detalle_pedido dp ON p.id = dp.pedido_id
       JOIN productos pr ON dp.producto_id = pr.id
       WHERE p.usuario_id = $1
       ORDER BY p.fecha DESC`,
      [usuario_id]
    );

    res.render('mis-pedidos', { pedidos: resultado.rows });
  } catch (err) {
    console.error('Error al obtener pedidos:', err);
    res.status(500).send('Error al obtener pedidos');
  }
});

module.exports = router;

// controllers/pedidoController.js
const pool = require('../db'); // Asegúrate que aquí importe la conexión a PG

// Función para obtener los pedidos de un usuario
const getPedidosByUsuario = async (req, res) => {
  try {
    const usuarioId = req.session.usuarioId; // O como tengas guardada la sesión
    if (!usuarioId) return res.redirect('/login'); // Si no hay sesión, manda a login

    const query = `
      SELECT p.id, p.fecha, p.estado,
             dp.cantidad,
             pr.nombre AS producto
      FROM pedidos p
      JOIN detalle_pedido dp ON p.id = dp.pedido_id
      JOIN productos pr ON dp.producto_id = pr.id
      WHERE p.usuario_id = $1
      ORDER BY p.fecha DESC
    `;

    const { rows: pedidos } = await pool.query(query, [usuarioId]);

    // Renderiza la vista y pasa los pedidos
    res.render('mis-pedidos', { pedidos });
  } catch (error) {
    console.error('Error obteniendo pedidos:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = { getPedidosByUsuario };

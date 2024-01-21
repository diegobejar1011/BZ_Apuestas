const equipoRoutes = require('./equipo.routes');
const partidoRoutes = require('./partido.routes');
const detalleRoutes = require('./detalle.routes');
const apuestaRoutes = require('./apuesta.routes');
const opcionRoutes = require('./opcion.routes');

const express = require('express');
const router = express.Router();

router.use("/equipos", equipoRoutes);
router.use("/partidos", partidoRoutes);
router.use("/detalles", detalleRoutes);
router.use("/apuestas", apuestaRoutes);
router.use("/opciones", opcionRoutes);

module.exports = router;
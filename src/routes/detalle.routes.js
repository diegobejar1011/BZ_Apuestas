const detalleControllers = require('../controllers/detalle.controller');

const express = require('express');
const router = express.Router();

router.get("/", detalleControllers.index);
router.post("/", detalleControllers.create);
router.post("/nuevo", detalleControllers.saveType);

module.exports = router;
const equipoControllers = require('../controllers/equipo.controller');

const express = require('express');
const router = express.Router();

router.get("/", equipoControllers.index);
router.post("/", equipoControllers.create);

module.exports = router;
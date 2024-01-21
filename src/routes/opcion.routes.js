const opcionControllers = require('../controllers/opcion.controller');


const express = require('express');
const router = express.Router();

router.get("/", opcionControllers.index);
router.post("/", opcionControllers.create);

module.exports = router;
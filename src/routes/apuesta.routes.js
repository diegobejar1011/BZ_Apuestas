const apuestaControllers = require('../controllers/apuesta.controller');


const express = require('express');
const router = express.Router();

router.get("/", apuestaControllers.index);
router.post("/", apuestaControllers.create);

module.exports = router;
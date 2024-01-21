const partidoControllers = require('../controllers/partido.controller');


const express = require('express');
const router = express.Router();

router.get("/", partidoControllers.index);
router.post("/", partidoControllers.create);

module.exports = router;
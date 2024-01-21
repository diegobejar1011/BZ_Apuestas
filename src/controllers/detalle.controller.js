const Detalle = require('../models/detalle.model');

async function index(req, res) {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;
        const {sort, order} = req.query;

        const detalles = await Detalle.getAll({offset, limit}, {sort, order});

        return res.status(200).json({
            success: true,
            detalles
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

async function saveType(req, res){
    try {
        const nombre = req.body.nombre;
        const nuevoTipo = await Detalle.saveType(nombre);

        return res.status(200).json({
            success: true,
            nuevoTipo
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

async function create(req, res){
    try {
        const { tipo, minuto, jugador} = req.body.nombre;
        const detalleNuevo = new Detalle(tipo, minuto, jugador);

        await detalleNuevo.save();

        return res.status(200).json({
            success: true,
            detalleNuevo
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    index, 
    saveType,
    create
}
const Equipo = require('../models/equipo.model');

async function index(req, res) {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;
        const {sort, order} = req.query;

        const equipos = await Equipo.getAll({offset, limit}, {sort, order});

        return res.status(200).json({
            success: true,
            equipos
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
        const nombre = req.body.nombre;
        const equipoNuevo = new Equipo(nombre);

        await equipoNuevo.save();

        return res.status(200).json({
            success: true,
            equipoNuevo
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
    create
}
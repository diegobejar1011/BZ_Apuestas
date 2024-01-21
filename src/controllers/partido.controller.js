const Partido = require('../models/partido.model');

async function index(req, res) {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;
        const {sort, order} = req.query;

        const partidos = await Partido.getAll({offset, limit}, {sort, order});

        return res.status(200).json({
            success: true,
            partidos
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
        const { equipo1, equipo2, fecha, hora} = req.body.nombre;
        const partidoNuevo = new Partido([equipo1, equipo2], fecha, hora);

        await partidoNuevo.save();

        return res.status(200).json({
            success: true,
            partidoNuevo
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
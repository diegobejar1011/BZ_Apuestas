const Apuesta = require('../models/apuesta.model');

async function index(req, res) {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;
        const {sort, order} = req.query;

        const apuestas = await Apuesta.getAll({offset, limit}, {sort, order});

        return res.status(200).json({
            success: true,
            apuestas
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
        const { descripcion, activa = 1 } = req.body.nombre;
        const apuestaNueva = new Apuesta(descripcion, activa);

        await apuestaNueva.save();

        return res.status(200).json({
            success: true,
            apuestaNueva
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
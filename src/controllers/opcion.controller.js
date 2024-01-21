const Opcion = require('../models/opcion.model');

async function index(req, res) {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;
        const {sort, order} = req.query;

        const opciones = await Option.getAll({offset, limit}, {sort, order});

        return res.status(200).json({
            success: true,
            opciones
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
        const {nombre, puntos = 50 } = req.body.nombre;
        const opcionNueva = new Opcion(nombre, puntos);

        await opcionNueva.save();

        return res.status(200).json({
            success: true,
            opcionNueva
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
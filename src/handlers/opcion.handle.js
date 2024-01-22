const Opcion = require('../models/opcion.model');

module.exports = (io,socket) => {

    const getAll = async (id) => {
        try {
            const opciones = await Opcion.getAll(id);

            io.emit("opcion:get_success", opciones);
        } catch (error) {
            const data = {
                message: "Error al conseguir las opciones",
                error: error.message
            }

            io.emit("opcion:get_failed", data);
        }
    }

    const create = async (payload) => {
        try {
            const opcionNueva = new Opcion(payload);

            await opcionNueva.save();

            socket.emit('opcion:created_success', opcionNueva);

            io.emit('opcion', opcionNueva);

        } catch (error) {
            const data = {
                message: 'Ocurrio un error al crear la opcion',
                error: error.message
            }

            socket.emit('opcion:created_failed', data);
        }
    }

    const updatePoints = async (type, id) => {
        let operacion;
        try {
            if(type == "G") {
                operacion = " + 100 ";
            }else{
                operacion = " - 25 ";
            }

            const opcion = await Opcion.updatedPoints(operacion, id);

            socket.emit("opcion:updated_sucess", opcion);

            io.emit("opcion:updated_sucess", opcion);
        } catch (error) {
            const data = {
                message: 'Ocurrio un error al actualizar los puntos de la opcion',
                error: error.message
            }

            socket.emit("opcion:updated_failed", data);
        }
    }

    socket.on('opcion:get', getAll);
    socket.on('opcion:create', create);
    socket.on('opcion:update', updatePoints);

}
const Apuesta = require('../models/apuesta.model');

module.exports = (io, socket) => {

    const createBet = async (payload) => {
        try {
            const {descripcion, activa} = payload;
            const nuevaApuesta = new Apuesta(descripcion, activa);

            await nuevaApuesta.save();
            
            socket.emit('apuesta:created_sucess', nuevaApuesta);

            io.emit('nueva_apuesta', nuevaApuesta);
            
        } catch (error) {

            const data = {
                message: 'Ocurrio un error al crear la apuesta',
                error: error.message
            }

            socket.emit('apuesta:created_failed', data);
        }
    }

    const getBet = async () => {
        try {
            const apuestas = await Apuesta.getAll();
            
            io.emit("apuesta", apuestas);

        } catch (error) {

            const data = {
                message: 'Ocurrio un error al crear la apuesta',
                error: error.message
            }

            io.emit("apuesta:get_failed", data);
        }
    }

    const updateById = async (result, id) => {
        try {
            const apuesta = await Apuesta.updateById(result, id);

            io.emit("apuesta:updated_success", apuesta);
        } catch (error) {
            const data = {
                message: "Ocurrio un error al actualizar la apuesta",
                error: error.message
            }

            socket.emit("apuesta:updated_failed", data);
        }
    }

    socket.on("apuesta:create", createBet);
    socket.on("apuesta:get", getBet);
    socket.on("apuesta:finish", updateById);
}
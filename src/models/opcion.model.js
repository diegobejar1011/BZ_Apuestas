const pool = require("../config/db.config");

class Opcion {
    constructor(nombre, puntos) {
        this.nombre = nombre;
        this.puntos = puntos;
    }

    async save() {
        const query = 'INSERT INTO opcion (nombre, puntos) VALUES (?,?)';
        const [result] = await pool.execute(query,[this.nombre, this.puntos]);
        return result;
    }

    static async getAll({offset, limit}, {sort, order}){
        let query = `SELECT id, nombre, puntos FROM opcion`;

        if(sort && order) {
            query+=`ORDER BY ${sort} ${order}`;
        }

        if(offset && limit) {
            query+= `LIMIT ${offset}, ${limit}`;
        }

        const [rows] = await pool.execute(query);

        return rows;
    }

    static updatedPoints = async (operacion, id) => {
        const query = `UPDATE opcion SET puntos = puntos ${ operacion } WHERE id_equipo = ?`;
        const [result] = await pool.execute(query, [id]);
        return result;
    }
}

module.exports = Opcion;
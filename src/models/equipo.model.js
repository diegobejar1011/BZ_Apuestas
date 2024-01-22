const pool = require('../config/db.config');

class Equipo {
    constructor(nombre){
        this.nombre = nombre;
    }

    async save() {
        const query = 'INSERT INTO equipo (nombre_equipo) VALUES (?)';
        const [result] = await pool.execute(query,[this.nombre]);
        return result;
    }

    static async getAll({offset, limit}, {sort, order}){
        let query = `SELECT id, nombre_equipo FROM equipo`;

        if(sort && order) {
            query+=`ORDER BY ${sort} ${order}`;
        }

        if(offset && limit) {
            query+= `LIMIT ${offset}, ${limit}`;
        }

        const [rows] = await pool.execute(query);

        return rows;
    }

}

module.exports = Equipo;
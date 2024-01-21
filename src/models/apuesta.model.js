const pool = require('../config/db.config');

class Apuesta {
    constructor(descripcion, activa){
        this.descripcion = descripcion;
        this.activa = activa;
    }

    async save() {
        const query = 'INSERT INTO apuesta (descripcion, activa) VALUES (?,?)';
        const [result] = await pool.execute(query,[this.descripcion, this.activa]);
        return result;
    }

    static async getAll({offset, limit}, {sort, order}){
        let query = `SELECT id, descripcion, activa FROM apuesta`;

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

module.exports = Apuesta;
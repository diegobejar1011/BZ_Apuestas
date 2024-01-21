const pool = require('../config/db.config');

class Detalle {
    constructor(tipo, minuto, jugador) {
        this.tipo = tipo;
        this.minuto = minuto;
        this.jugador = jugador;
    }

    async save() {
        const query = 'INSERT INTO detalle (tipo, minuto, jugador) VALUES (?,?,?)';
        const [result] = await pool.execute(query,[this.tipo, this.minuto, this.jugador]);
        return result;
    }

    static async saveType (nombre) {
        const query = 'INSERT INTO tipo_detalle (nombre) VALUES (?)';
        const [result] = await pool.execute(query, [nombre]);
        return result;
    }

    static async getAll({offset, limit}, {sort, order}){
        let query = `SELECT id, tipo, minuto, jugador FROM detalle`;

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

module.exports = Detalle;
const pool = require('../config/db.config');

class Partido {
    constructor( equipos, fecha, hora){
        this.equipos = equipos;
        this.fecha = fecha;
        this.hora = hora;
    }

    async save() {
        const query = 'INSERT INTO partido (equipo1, equipo2, fecha, hora) VALUES (?,?,?,?)';
        const [result] = await pool.execute(query,[this.equipos[0], this.equipos[1], this.fecha, this.hora]);
        return result;
    }

    static async getAll({offset, limit}, {sort, order}){
        let query = `SELECT id, equipo1, equipo2, fecha, hora FROM partido`;

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

module.exports = Partido;
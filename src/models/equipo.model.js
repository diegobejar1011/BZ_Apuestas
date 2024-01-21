const pool = require('../config/db.config');
class Equipo {
    constructor(id, nombre){
        this.id = id;
        this.nombre = nombre;
    }

    async save() {
        const query = 'INSERT INTO equipo (id, nombre) VALUES (?,?)';
        const [result] = await pool.execute(query,[this.id, this.nombre]);
        return result;
    }

    static async getAll({offset, limit}, {sort, order}){
        let query = `SELECT id, nombre FROM equipo`;

        if(sort && order) {
            query+=`ORDER BY ${sort} ${order}`;
        }

        if(offset && limit) {
            query+= `LIMIT ${offset}, ${limit}`;
        }
    }
}
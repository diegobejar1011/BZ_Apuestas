require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io')
const cors = require('cors');
const morgan = require('morgan');




const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//Config rutas HTTP
const indexRoutes = require("./src/routes/index.routes");
app.use(indexRoutes);


const io = new Server (httpServer, {
    cors: {
        origin: "http://127.0.0.1:3000"
    },
    pingInterval: 1000,
    pingTimeout: 2000
});



app.listen(process.env.PORT_API, () => {
    console.log(`${process.env.NAME_APLICATION} corriendo a toda maquina`);
})


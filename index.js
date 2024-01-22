require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io')
const cors = require('cors');
const morgan = require('morgan');


const app = express();
const httpServer = createServer(app);
const io = new Server (httpServer, {
    cors: {
        origin: "http://127.0.0.1:5500"
    },
    pingInterval: 1000,
    pingTimeout: 2000
});


//middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//Config rutas HTTP
const indexRoutes = require("./src/routes/index.routes");
app.use(indexRoutes);

const indexHandlers = require('./src/handlers/index.handler');

const onConnection = (socket) => {
    console.log('cliente conectado');
    indexHandlers.manipulateBet(io, socket);
    indexHandlers.manipulateOption(io, socket);
};

io.on('connection', onConnection);
 

const PORT = process.env.API_PORT;
httpServer.listen(PORT);


require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io')
const cors = require('cors');


const app = express();
const httpServer = createServer(app);

const io = new Server (httpServer, {
    cors: {
        origin: "http://127.0.0.1:3000"
    },
    pingInterval: 1000,
    pingTimeout: 2000
});


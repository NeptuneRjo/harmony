"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const mongoConfigTest_1 = require("./config/mongoConfigTest");
const routes_1 = require("../routes");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
require("dotenv/config");
require("../config/passport");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
        credentials: true,
    },
});
/* <-- Middleware --> */
app.set('trust proxy', 1);
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(passport_1.default.initialize());
/* <-- Routes --> */
app.use('/auth', routes_1.authRoutes);
app.use('/chat', routes_1.chatRoutes);
/* <-- Server --> */
// Initializes Mongodb-Memory-Store
(0, mongoConfigTest_1.initializeMongoServer)();
mongoose_1.connection.on('connected', () => {
    httpServer.listen(port, () => {
        console.log('Connect to DB and listening on port:', port);
    });
});
/* Web Sockets */
io.on('connection', (socket) => {
    socket.on('join', (room) => {
        socket.join(room);
    });
    socket.on('leave', (room) => {
        socket.leave(room);
    });
    socket.on('chat', (data) => {
        io.to(data.id).emit('chat', data.messages);
    });
});
io.engine.on('connection_error', (err) => {
    const { req, code, message, context } = err;
    console.log(req);
    console.log(code);
    console.log(message);
    console.log(context);
});

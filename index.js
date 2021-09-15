import express from 'express';
import dotenv from 'dotenv';
import { PORT } from './config/variables';
import cors from 'cors';
import http from 'http';
import socketIO, { Server } from 'socket.io';
import orderRouter from './controllers/order';
import './config/db'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    // transports: ['polling'],
    cors: {
        cors: {
            origin: "http://localhost:3000"
        }
    }
});

io.on('connection', (socket) => {
    console.log("A user has connected");

    socket.on('message', (message) => {
        console.log(`message from socket ${socket.id} : ${message}`)
    })

    socket.on('disconnect', () => {
        console.log(`socked id ${socket.id} disconnected`)
    })
})


app.use(express.json())
app.use(cors())
app.use('/orders', orderRouter)

app.get('/', (req, res) => {
    res.send("Hello")
})

server.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT} 🥁`)
})

export { io }

import express from 'express';
import { io } from '..';
import Order from '../models/order';

const router =  express.Router()

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).send(orders)
    } catch (error) {
        console.log(error)
        res.send(`GET Order error: ${error}`)
    }
});

router.post('/', async(req, res) => {
    try {
        const order =  new Order(req.body);
        await order.save()
        const orders = await Order.find()
        io.emit('order added', orders)
        res.status(201).send(order)
    } catch (error) {
        console.log(error)
        res.send(`POST Order error: ${error}`)
    }
});

export default router;
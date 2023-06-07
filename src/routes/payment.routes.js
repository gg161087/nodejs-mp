import {Router} from 'express'

import {createOrder, receiveWebhook} from '../controllers/payment.controller.js'

const router = Router()

router.post('/create-order', createOrder)

router.get('/success', (req, res) => {
    res.send('success order')
})

router.get('/failure', (req, res) => {
    res.send('failure order')
})

router.get('/pending', (req, res) => {
    res.send('pending order')
})

router.post('/webhook', receiveWebhook)

export default router
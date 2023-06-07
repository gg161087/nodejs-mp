import mercadopago from 'mercadopago'

import {HOST, PORT, ACCESS_TOKEN} from '../config.js';

export const createOrder = async (req, res) => {
    mercadopago.configure({
        access_token: ACCESS_TOKEN
    })
    const result = await mercadopago.preferences.create({
        items: [
            {
                title: "Laptop Dell",
                unit_price: 500,
                currency_id: "ARS",
                quantity: 1
            }
        ],
        back_urls: {
            success: `${HOST}:${PORT}/success`,
            failure: `${HOST}:${PORT}/failure`,
            pending: `${HOST}:${PORT}/pending`,
        },
        notification_url: "https://eaca-170-155-100-136.sa.ngrok.io/webhook",
    })
    console.log(result);
    res.send(result.body)
}

export const receiveWebhook = async (req, res) => {
    const payment = req.query

    try {
        if (payment.type == 'payment') {
            const data = await mercadopago.payment.findById(payment['data.id'])
            console.log(data);
        }
    
        res.sendStatus(204)
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json({ error: error.message})
    }

}
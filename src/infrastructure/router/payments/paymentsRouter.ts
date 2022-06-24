import axios from "axios";
import express from "express";
import e, { Request, Response } from "express";
import AddCallerBalanceController from "../../controllers/caller/addCallerBalance.controller";

const router = express.Router();

const getPaymentAmount = async (paymentId: string) => {
    const url = "https://api.mercadopago.com/v1/payments/" + paymentId + "";
    let payment;
    try{
        payment = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: <string>process.env.MELI_API_KEY
            }
        })
    }catch(e: any){
        console.log(e.message);
        return
    }
    return payment.data.transaction_amount;
}

router.get('/payments', async (req: Request, res: Response) => {
    if(req.query.status === 'approved'){
        const amount = await getPaymentAmount(<string>req.query.payment_id);
        const callerId = <string>req.query.external_reference;
        AddCallerBalanceController.getInstance().run(callerId, amount);
        res.status(200).send("ok");
    }
})


export {router as paymentsRouter};

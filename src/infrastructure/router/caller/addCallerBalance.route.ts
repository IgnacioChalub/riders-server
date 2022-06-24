import {Request} from "express";
import {tokenValidation} from "../shared/tokenValidation";
import AddCallerBalanceController from "../../controllers/caller/addCallerBalance.controller";
import axios from "axios";

const addCallerBalance = async (args: any, req: Request): Promise<any> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "caller");
    
    const {paymentId} = args.input;

    const payment = await getPayment(paymentId);

    const paymentCallerId = payment.external_reference;
    if(id !== paymentCallerId) throw Error('Could not add balance');

    if(payment.status !== "approved") throw Error("Payment was not approved");
    
    const amount = payment.transaction_details.net_received_amount;

    const balance = await AddCallerBalanceController.getInstance().run(payment.id, id, amount);
    return {
        balance: balance
    }
}

const getPayment = async (paymentId: string) => {
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
        throw Error("Payment not found");
    }
    return payment.data;
}

export default addCallerBalance;
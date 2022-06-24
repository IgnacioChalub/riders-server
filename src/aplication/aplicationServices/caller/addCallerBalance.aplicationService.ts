import { Caller } from "../../../domain/entities/caller";
import { Payment } from "../../../domain/entities/payment";
import ICallerRepository from "../../repositories/caller.repository";

class AddCallerBalanceAplicationService{

    private callerRepository: ICallerRepository;

    constructor(callerRepository: ICallerRepository){
        this.callerRepository = callerRepository;
    }

    async run(paymentId: string, callerId: string, balance: number): Promise<number> {

        const payment: Payment = await this.callerRepository.getPayment(paymentId);
        if(payment) throw Error("Payment already added");

        const caller: Caller = await this.callerRepository.getById(callerId);
        if(!caller) throw Error("Caller not found");

        //redondea para abajo pq los centavos siempre son enteros
        const balanceInCents = Math.floor(balance*100);
        caller.addBalance(balanceInCents);

        const newPayment = new Payment(paymentId, callerId, balanceInCents, new Date());

        await this.callerRepository.savePayment(newPayment);
        await this.callerRepository.saveNewBalance(caller);
        
        return caller.getBalance();
    }

}

export default AddCallerBalanceAplicationService;
import { Caller } from "../../../domain/entities/caller";
import ICallerRepository from "../../repositories/caller.repository";

class AddCallerBalanceAplicationService{

    private callerRepository: ICallerRepository;

    constructor(callerRepository: ICallerRepository){
        this.callerRepository = callerRepository;
    }

    async run(callerId: string, balance: number): Promise<void> {
        const caller: Caller = await this.callerRepository.getById(callerId);
        if(!caller) return;

        //redondea para abajo pq los centavos siempre son enteros
        const balanceInCents = Math.floor(balance*100);
        caller.addBalance(balanceInCents);

        await this.callerRepository.saveNewBalance(caller);
    }

}

export default AddCallerBalanceAplicationService;
import ICallRepository from "../../repositories/call.repository";
import Call from "../../../domain/entities/call";
import ICallerRepository from "../../repositories/caller.repository";
import { Caller } from "../../../domain/entities/caller";

class CancelCallAplicationService {

    private callRepository: ICallRepository;
    private callerRepository: ICallerRepository;

    constructor(callRepository: ICallRepository, callerRepository: ICallerRepository) {
        this.callRepository = callRepository;
        this.callerRepository = callerRepository;
    }

    async run(callerId: string, callId: string): Promise<void> {
        const call: Call = await this.callRepository.getActiveCall(callId);
        if(!call) throw Error("Call not found");
        
        if(!call.isCaller(callerId)) throw Error("Not found call for this caller");
        if(!call.isActive()) throw Error("Call has already been accepted");

        const caller: Caller = await this.callerRepository.getById(callerId);
        caller.addBalance(call.getPriceInCents());
        this.callerRepository.saveNewBalance(caller);

        await this.callRepository.setInactive(call);
    }

}

export default CancelCallAplicationService;
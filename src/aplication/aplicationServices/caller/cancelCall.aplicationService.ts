import ICallRepository from "../../repositories/call.repository";
import Call from "../../../domain/entities/call";

class CancelCallAplicationService {

    private callRepository: ICallRepository;

    constructor(callRepository: ICallRepository) {
        this.callRepository = callRepository;
    }

    async run(callerId: string, callId: string): Promise<void> {
        const call: Call = await this.callRepository.getActiveCall(callId);
        if(!call) throw Error("Call not found");
        if(!call.isCaller(callerId)) throw Error("Not found call for this caller");
        if(!call.isActive()) throw Error("Call has already been accepted");
        await this.callRepository.setInactive(call);
    }

}

export default CancelCallAplicationService;
import Call from "../../../domain/entities/call";
import ICallRepository from "../../repositories/call.repository";

class GetActiveCallsAplicationService{

    private callRepository: ICallRepository;

    constructor(callRepository: ICallRepository) {
        this.callRepository = callRepository;
    }

    async run(callerId: string): Promise<Call[]>{
        return await this.callRepository.getAllActiveCalls(callerId);
    }
}
export default GetActiveCallsAplicationService;

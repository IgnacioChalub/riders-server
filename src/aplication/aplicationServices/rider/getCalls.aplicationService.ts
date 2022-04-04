import ICallRepository from "../../repositories/call.repository";
import Call from "../../../domain/entities/call";

class GetCallsAplicationService{

    private readonly callRepository: ICallRepository;

    constructor(callRepository: ICallRepository) {
        this.callRepository = callRepository;
    }

    async run(riderLat: number, riderLong: number): Promise<Call[]>{
        const callsInSquare: Call[] = await this.callRepository.getCallsInSquare(riderLat, riderLong, 10);
        const filteredCalls: Call[] = [];
        for (const call of callsInSquare) {
            if(call.isInRadius(riderLat, riderLong, 10)) filteredCalls.push(call);
        }
        return filteredCalls;
    }
}

export default GetCallsAplicationService;
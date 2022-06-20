import ICallRepository from "../../repositories/call.repository";
import Call from "../../../domain/entities/call";
import IRiderRepository from "../../repositories/rider.repository";
import Rider from "../../../domain/entities/rider";

class GetAvailableCallsAplicationService{

    private readonly callRepository: ICallRepository;
    private riderRepository: IRiderRepository;

    constructor(callRepository: ICallRepository, riderRepository: IRiderRepository) {
        this.callRepository = callRepository;
        this.riderRepository = riderRepository;
    }

    async run(riderId: string, riderLat: number, riderLong: number): Promise<Call[]>{
        const rider: Rider = await this.riderRepository.getById(riderId);
        const callsInSquare: Call[] = await this.callRepository.getCallsInSquare(riderLat, riderLong, 10, rider.getVehicleType());
        const filteredCalls: Call[] = [];
        for (const call of callsInSquare) {
            if(call.isInRadius(riderLat, riderLong, 10) && rider.hasMinStarsRequired(call.getMinRiderRatingStars())) filteredCalls.push(call);
        }
        return filteredCalls;
    }
}

export default GetAvailableCallsAplicationService;
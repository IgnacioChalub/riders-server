import IRideRepository from "../../repositories/ride.repository";
import {Ride} from "../../../domain/entities/ride";

class GetCallerRecordAplicationService{
    private rideRepository: IRideRepository;

    constructor(rideRepository: IRideRepository) {
        this.rideRepository = rideRepository;
    }

    async run(callerId: string): Promise<Ride[]> {
        return await this.rideRepository.getCallerInactiveRides(callerId);
    }
}

export  default GetCallerRecordAplicationService;

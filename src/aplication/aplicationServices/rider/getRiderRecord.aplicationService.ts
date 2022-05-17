import {Ride} from "../../../domain/entities/ride";
import IRideRepository from "../../repositories/ride.repository";

class GetRiderRecordAplicationService{

    private rideRepository: IRideRepository;

    constructor(rideRepository: IRideRepository) {
        this.rideRepository = rideRepository;
    }

    async run(riderId: string): Promise<Ride[]> {
        return await this.rideRepository.getRiderInactiveRides(riderId);
    }
}

export default GetRiderRecordAplicationService;
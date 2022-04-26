import IRideRepository from "../../repositories/ride.repository";
import {Ride} from "../../../domain/entities/ride";

class GetRiderRideStatusAplicationService{

    private rideRepository: IRideRepository;

    constructor(rideRepository: IRideRepository) {
        this.rideRepository = rideRepository;
    }

    async run(riderId: string): Promise<boolean>{
	const ride: Ride =  await this.rideRepository.getRiderActiveRide(riderId)
        if(ride) return true;
        return false;
    }
}

export default GetRiderRideStatusAplicationService;

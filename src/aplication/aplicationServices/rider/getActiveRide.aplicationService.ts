import IRideRepository from "../../repositories/ride.repository";
import ICallRepository from "../../repositories/call.repository";
import {Ride} from "../../../domain/entities/ride";

class GetActiveRideAplicationService{
    private rideRepository: IRideRepository;
    private callRepository: ICallRepository;

    constructor(rideRepository: IRideRepository, callRepository: ICallRepository) {
        this.rideRepository = rideRepository;
        this.callRepository = callRepository;
    }

    async run(riderId: string): Promise<Ride> {
        const ride: Ride = await this.rideRepository.getRiderActiveRide(riderId);
        if(!ride) throw Error("Rider not in a ride");
        return ride;
    }
}

export default GetActiveRideAplicationService;
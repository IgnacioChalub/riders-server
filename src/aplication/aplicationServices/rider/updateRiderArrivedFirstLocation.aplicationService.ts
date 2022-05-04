import {Ride} from "../../../domain/entities/ride";
import IRideRepository from "../../repositories/ride.repository";

class UpdateRiderArrivedFirstLocationAplicationService{

    private rideRepository: IRideRepository;

    constructor(rideRepository: IRideRepository) {
        this.rideRepository = rideRepository;
    }

    async run(riderId: string): Promise<Ride>{
        const ride: Ride = await this.rideRepository.getRiderActiveRide(riderId);
        if(!ride) throw Error("Rider not in ride");
        ride.setRiderArrivedStartLocation();
        await this.rideRepository.updateRiderArrivedFirstLocation(ride);
        return ride;
    }

}

export default UpdateRiderArrivedFirstLocationAplicationService;
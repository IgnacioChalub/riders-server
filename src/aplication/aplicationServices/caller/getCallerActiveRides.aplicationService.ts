import { Ride } from "../../../domain/entities/ride";
import IRideRepository from "../../repositories/ride.repository";

class GetCallerActiveRidesAplicationService{
    
    private rideRepository: IRideRepository;

    constructor(rideRepository: IRideRepository){
        this.rideRepository = rideRepository;
    }

    async run(callerId: string): Promise<Ride[]>{
        return await this.rideRepository.getCallerActiveRides(callerId);
    }

}

export default GetCallerActiveRidesAplicationService;
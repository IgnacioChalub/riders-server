import {Ride} from "../../../domain/entities/ride";
import IRideRepository from "../../repositories/ride.repository";
import ICallerRepository from "../../repositories/caller.repository";
import {Caller} from "../../../domain/entities/caller";

class FinishRideAplicationService{

    private rideRepository: IRideRepository;
    private callerRepository: ICallerRepository;

    constructor(rideRepository: IRideRepository, callerRepository: ICallerRepository) {
        this.rideRepository = rideRepository;
        this.callerRepository = callerRepository;
    }

    async run(riderId: string, callerDNI: number): Promise<Ride>{
        const ride: Ride = await this.rideRepository.getRiderActiveRide(riderId);
        if(!ride) throw Error("Rider not in ride");
       
        const caller: Caller = await this.callerRepository.getById(ride.getCallerId());
        if(!caller.isDNI(callerDNI)) throw Error("Incorrect DNI");
        
        ride.finishRide();
        await this.rideRepository.finishRide(ride);
        
        return ride;
    }


}

export default FinishRideAplicationService;
import ICallRepository from "../../repositories/call.repository";
import IRideRepository from "../../repositories/ride.repository";
import {Ride} from "../../../domain/entities/ride";
import Call from "../../../domain/entities/call";
import Rider from "../../../domain/entities/rider";
import IRiderRepository from "../../repositories/rider.repository";

class AcceptCallAplicationService{

    private rideRepository: IRideRepository;
    private callRepository: ICallRepository;
    private riderRepository: IRiderRepository;

    constructor(rideRepository: IRideRepository, callRepository: ICallRepository, riderRepository: IRiderRepository) {
        this.rideRepository = rideRepository;
        this.callRepository = callRepository;
        this.riderRepository = riderRepository;
    }

    async run(callId: string, riderId: string): Promise<Ride> {
        const ride: Ride = await this.rideRepository.getRiderActiveRide(riderId);
        if(ride) throw Error("Rider already in a ride");
        
        const call: Call = await this.callRepository.getActiveCall(callId);
        if(!call) throw Error("Call not found");
        
        call.accept();
        
        const rider: Rider = await this.riderRepository.getById(riderId);
        const rideId: string = await this.rideRepository.generateId();
        const newRide: Ride = new Ride(rideId, riderId, call, false, true, new Date(), rider.getVehicleType(), new Date(), -1);
        
        await this.callRepository.setInactive(call);
        await this.rideRepository.save(newRide);
        
        return newRide;
    }

}

export default AcceptCallAplicationService;
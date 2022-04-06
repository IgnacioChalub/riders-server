import ICallRepository from "../../repositories/call.repository";
import IRideRepository from "../../repositories/ride.repository";
import {Ride} from "../../../domain/entities/ride";
import Call from "../../../domain/entities/call";

class AcceptCallAplicationService{

    private rideRepository: IRideRepository;
    private callRepository: ICallRepository;

    constructor(rideRepository: IRideRepository, callRepository: ICallRepository) {
        this.rideRepository = rideRepository;
        this.callRepository = callRepository;
    }

    async run(callId: string, riderId: string): Promise<Ride> {
        const ride: Ride = await this.rideRepository.getRiderActiveRide(riderId);
        if(ride) throw Error("Rider already in a ride");
        const call: Call = await this.callRepository.getById(callId);
        if(!call) throw Error("Call not found");
        call.accept();
        const rideId: string = await this.rideRepository.generateId();
        const newRide: Ride = new Ride(rideId, riderId,call,false, true, new Date());
        await this.callRepository.setInactive(call);
        await this.rideRepository.save(newRide);
        return newRide;
    }

}

export default AcceptCallAplicationService;
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

    async run(callId: string): Promise<Ride> {
        const call: Call = await this.callRepository.getById(callId);
        if(!call) throw Error("Call not found");
        call.getAccepted();
        const rideId: string = await this.rideRepository.generateId();
        const ride: Ride = new Ride(rideId, call, false, new Date());
        await this.callRepository.update(call);
        await this.rideRepository.save(ride);
        return ride;
    }

}

export default AcceptCallAplicationService;
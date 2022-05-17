import IRideRepository from "../../repositories/ride.repository";
import ICallerRepository from "../../repositories/caller.repository";
import {Ride} from "../../../domain/entities/ride";
import {Caller} from "../../../domain/entities/caller";
import RateCallerDomainService from "../../../domain/services/rider/rateCaller.domainService";

class RateCallerAplicationService{

    private rideRepository: IRideRepository;
    private callerRepository: ICallerRepository;
    private rateCallerDomainService: RateCallerDomainService;

    constructor(rideRepository: IRideRepository, callerRepository: ICallerRepository, rateCallerDomainService: RateCallerDomainService) {
        this.rideRepository = rideRepository;
        this.callerRepository = callerRepository;
        this.rateCallerDomainService = rateCallerDomainService;
    }

    async run(rideId: string, riderId: string, stars: number): Promise<void>{
        if(stars < 0 || stars > 5) throw Error("Invalid rating");
        const ride: Ride = await this.rideRepository.getById(rideId);
        if(!ride) throw Error("Ride not found");
        const caller: Caller = await this.callerRepository.getById(ride.getCallerId());
        this.rateCallerDomainService.run(riderId, ride, caller, stars)
        this.callerRepository.saveRating(caller).then( () =>{
            this.rideRepository.updateCallerRated(ride);
        });
    }
}

export default RateCallerAplicationService;
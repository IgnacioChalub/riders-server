import IRideRepository from "../../repositories/ride.repository";
import {Ride} from "../../../domain/entities/ride";
import IRiderRepository from "../../repositories/rider.repository";
import Rider from "../../../domain/entities/rider";
import RateRiderDomainService from "../../../domain/services/caller/rateRider.domainService";

class RateRiderAplicationService{

    private rideRepository: IRideRepository;
    private riderRepository: IRiderRepository;
    private rateRiderDomainService: RateRiderDomainService;

    constructor(rideRepository: IRideRepository, riderRepository: IRiderRepository, rateRiderDomainService: RateRiderDomainService) {
        this.rideRepository = rideRepository;
        this.riderRepository = riderRepository;
        this.rateRiderDomainService = rateRiderDomainService;
    }

    async run(rideId: string, callerId: string, stars: number): Promise<void>{
        if(stars < 0 || stars > 5) throw Error("Invalid rating");

        const ride: Ride = await this.rideRepository.getById(rideId);
        if(!ride) throw Error("Ride not found");
        
        const rider: Rider = await this.riderRepository.getById(ride.getRiderId());
        this.rateRiderDomainService.run(callerId, ride, rider, stars);
        
        this.riderRepository.saveRating(rider).then( () =>{
            this.rideRepository.updateRiderRated(ride, stars);
        });
    }
}

export default RateRiderAplicationService;
import {Ride} from "../../../domain/entities/ride";
import IRideRepository from "../../repositories/ride.repository";
import ICallerRepository from "../../repositories/caller.repository";
import {Caller} from "../../../domain/entities/caller";
import IEmailService from "../../infrastructureServices/emailService";
import IRiderRepository from "../../repositories/rider.repository";
import Rider from "../../../domain/entities/rider";

class FinishRideAplicationService{

    private rideRepository: IRideRepository;
    private callerRepository: ICallerRepository;
    private riderRepository: IRiderRepository;
    private emailService: IEmailService;

    constructor(rideRepository: IRideRepository, callerRepository: ICallerRepository, riderRepository: IRiderRepository, emailService: IEmailService) {
        this.rideRepository = rideRepository;
        this.callerRepository = callerRepository;
        this.emailService = emailService;
        this.riderRepository = riderRepository;
    }

    async run(riderId: string, callerDNI: number): Promise<Ride>{
        const ride: Ride = await this.rideRepository.getRiderActiveRide(riderId);
        if(!ride) throw Error("Rider not in ride");
       
        const caller: Caller = await this.callerRepository.getById(ride.getCallerId());
        if(!caller.isDNI(callerDNI)) throw Error("Incorrect DNI");
        
        ride.finishRide();
        await this.rideRepository.finishRide(ride);
        
        const rider: Rider = await this.riderRepository.getById(riderId);
        rider.addBalance(ride.getPriceInCents());
        this.riderRepository.saveNewBalance(rider);
        
        if(caller.recivesEmailNotifications()) this.emailService.sendEmail(caller.getEmail(), 'Ride finished', 'Rider arrived the finish location. We hope you liked the service.');

        return ride;
    }


}

export default FinishRideAplicationService;
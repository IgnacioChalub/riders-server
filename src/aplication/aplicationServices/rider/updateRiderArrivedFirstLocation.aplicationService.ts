import { Caller } from "../../../domain/entities/caller";
import {Ride} from "../../../domain/entities/ride";
import IEmailService from "../../infrastructureServices/emailService";
import ICallerRepository from "../../repositories/caller.repository";
import IRideRepository from "../../repositories/ride.repository";

class UpdateRiderArrivedFirstLocationAplicationService{

    private rideRepository: IRideRepository;
    private callerRepository: ICallerRepository;
    private emailService: IEmailService;

    constructor(rideRepository: IRideRepository, callerRepository: ICallerRepository, emailService: IEmailService) {
        this.rideRepository = rideRepository;
        this.callerRepository = callerRepository;
        this.emailService = emailService;
    }

    async run(riderId: string): Promise<Ride>{
        const ride: Ride = await this.rideRepository.getRiderActiveRide(riderId);
        if(!ride) throw Error("Rider not in ride");
        ride.setRiderArrivedStartLocation();
        await this.rideRepository.updateRiderArrivedFirstLocation(ride);

        const caller: Caller = await this.callerRepository.getById(ride.getCallerId());
        if(caller.recivesEmailNotifications()) this.emailService.sendEmail(caller.getEmail(), 'Rider arrived first location!', 'Rider arrived the first location. He will be coming soon.');

        return ride;
    }

}

export default UpdateRiderArrivedFirstLocationAplicationService;
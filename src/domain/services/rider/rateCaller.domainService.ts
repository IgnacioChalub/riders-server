import {Caller} from "../../entities/caller";
import {Ride} from "../../entities/ride";

class RateCallerDomainService{

    run(riderId: string, ride: Ride, caller: Caller, stars: number): void{
        if(ride.callerIsRated()) throw Error("Caller already rated");
        if(ride.getRiderId() !==  riderId) throw Error("Rider does not belong to this ride");
        caller.addRating(stars);
    }

}

export default RateCallerDomainService;
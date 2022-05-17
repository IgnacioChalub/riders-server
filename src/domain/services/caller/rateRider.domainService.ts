import {Ride} from "../../entities/ride";
import Rider from "../../entities/rider";

class RateRiderDomainService{

    run(callerId: string, ride: Ride, rider: Rider, stars: number): void{
        if(ride.riderIsRated()) throw Error("Rider already rated");
        if(ride.getCallerId() !==  callerId) throw Error("Rider does not belong to this ride");
        rider.addRating(stars);
    }

}

export default RateRiderDomainService;
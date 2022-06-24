import Call from "../../entities/call";
import {Caller} from "../../entities/caller";
import {Location} from "../../entities/location";
import RequestedVehicles from "../../entities/requestedVehicles";

class CreateCallDomainService{

    run(id: string, caller: Caller, requestedVehicles: RequestedVehicles, priceInCents: number, description: string, startLocation: Location, finishLocation: Location, date: Date, minRiderRatingStars: number): Call{
        if(priceInCents < 0) throw Error("Price can not be under 0");
        if(minRiderRatingStars < 0 || minRiderRatingStars > 5) throw Error("Invalid min rider rating stars");
        if(!caller.discountBalanceIfPosible(priceInCents)) throw Error("Insuficients balance to create a call");
        return new Call(id, caller.getId(), caller.getRatingStart(), requestedVehicles, priceInCents, description, startLocation, finishLocation, date, true, minRiderRatingStars);
    }
}

export default CreateCallDomainService;